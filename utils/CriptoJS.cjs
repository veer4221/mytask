// import crypto from "crypto";
import CryptoJS from "crypto-js";

export const encryptOBJ = (obj) => CryptoJS.AES.encrypt(JSON.stringify(obj), "SECURE").toString();

export const decryptOBJ = (data) => JSON.parse(CryptoJS.AES.decrypt(data, "SECURE").toString(CryptoJS.enc.Utf8));

// Encryption function
export async function encryptData(str) {
  return new Promise(function (resolve, reject) {
    try {
      // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(str, "SECURE").toString();
      return resolve(ciphertext);
    } catch (error) {
      return reject(error);
    }
  });
}

export async function descryptData(str) {
  return new Promise(function (resolve, reject) {
    try {
      // Encrypt
      var bytes = CryptoJS.AES.decrypt(str, "SECURE");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      return resolve(originalText);
    } catch (error) {
      return reject(error);
    }
  });
}
