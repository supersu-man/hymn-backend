const CryptoJS = require('crypto-js')

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

const encrypt = (text) => {
	var encryptedAES = CryptoJS.AES.encrypt(text, ENCRYPTION_KEY)
	return encryptedAES.toString()
}

const decrypt = (ciphertext) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY)
	return bytes.toString(CryptoJS.enc.Utf8);
}


const encryptECB = (text) => {
	const hash = CryptoJS.SHA256(ENCRYPTION_KEY)
	const ciphertext = CryptoJS.AES.encrypt(text, hash, { mode: CryptoJS.mode.ECB })
	return ciphertext.toString()
}

const decryptECB = (ciphertext) => {
	const hash = CryptoJS.SHA256(ENCRYPTION_KEY)
	const bytes = CryptoJS.AES.decrypt(ciphertext, hash, { mode: CryptoJS.mode.ECB })
	return bytes.toString(CryptoJS.enc.Utf8);
}




module.exports = { encrypt, encryptECB, decrypt, decryptECB }