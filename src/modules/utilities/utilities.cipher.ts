import { createCipheriv, createDecipheriv } from "crypto";
import { CONFIG_CIPHER } from "src/config/config.export";

export function encrypt(str: string, iv: string = CONFIG_CIPHER.AES_CIPHER_IV) {
  const key = Buffer.from(CONFIG_CIPHER.AES_CIPHER_KEY, "hex");
  const bIV = Buffer.from(iv, "hex");
  const cipher = createCipheriv('aes-256-cbc', key, bIV);
  let encrypted = cipher.update(str, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(str: string, iv: string = CONFIG_CIPHER.AES_CIPHER_IV) {
  const key = Buffer.from(CONFIG_CIPHER.AES_CIPHER_KEY, "hex")
  const bIV = Buffer.from(iv, "hex")
  const decipher = createDecipheriv('aes-256-cbc', key, bIV);
  let decrypted = decipher.update(str, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}