/* ==============================================================
   QRIS: ubah payload QRIS statis menjadi QRIS bernominal (Tag 54)
   Format mengikuti EMVCo MPM: TLV (ID 2 digit, panjang 2 digit, nilai),
   ditutup Tag 63 berisi CRC-16/CCITT-FALSE.
   ============================================================== */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.QRIS = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var MAX_AMOUNT = 10000000; // batas per transaksi QRIS (Rp10 juta)

  function crc16(str) {
    var crc = 0xffff;
    for (var i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (var k = 0; k < 8; k++) {
        crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  function parse(payload) {
    var tags = [];
    var i = 0;
    while (i < payload.length) {
      var id = payload.substr(i, 2);
      var len = parseInt(payload.substr(i + 2, 2), 10);
      if (!/^\d{2}$/.test(id) || isNaN(len) || i + 4 + len > payload.length) {
        throw new Error('Payload QRIS tidak valid di posisi ' + i);
      }
      tags.push({ id: id, value: payload.substr(i + 4, len) });
      i += 4 + len;
    }
    return tags;
  }

  function tlv(id, value) {
    return id + String(value.length).padStart(2, '0') + value;
  }

  function isValid(payload) {
    if (typeof payload !== 'string' || payload.length < 8) return false;
    var body = payload.slice(0, -4);
    if (body.slice(-4) !== '6304') return false;
    return crc16(body) === payload.slice(-4).toUpperCase();
  }

  function getTag(payload, id) {
    var tag = parse(payload).filter(function (t) { return t.id === id; })[0];
    return tag ? tag.value : null;
  }

  function withAmount(staticPayload, amount) {
    if (!isValid(staticPayload)) throw new Error('Checksum QRIS sumber tidak cocok');
    if (!Number.isInteger(amount) || amount < 1 || amount > MAX_AMOUNT) {
      throw new Error('Nominal harus bilangan bulat antara 1 dan ' + MAX_AMOUNT);
    }

    var tags = parse(staticPayload).filter(function (t) {
      return t.id !== '63' && t.id !== '54';
    });
    tags.forEach(function (t) {
      if (t.id === '01') t.value = '12'; // 11 = statis, 12 = dinamis (sekali pakai)
    });

    // Tag 54 diletakkan tepat setelah Tag 53 (mata uang), sesuai urutan umum.
    var at = tags.findIndex(function (t) { return t.id === '53'; });
    tags.splice(at === -1 ? tags.length : at + 1, 0, { id: '54', value: String(amount) });

    var body = tags.map(function (t) { return tlv(t.id, t.value); }).join('') + '6304';
    return body + crc16(body);
  }

  return {
    MAX_AMOUNT: MAX_AMOUNT,
    crc16: crc16,
    parse: parse,
    isValid: isValid,
    getTag: getTag,
    withAmount: withAmount
  };
});
