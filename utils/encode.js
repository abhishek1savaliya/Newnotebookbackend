const crypto = require('crypto');

const keyString = 'Jayshree Krishna';
exports.KEY = crypto.createHash('sha256').update(keyString).digest();



exports.encrypt = (text, KEY) => {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(KEY, 'hex'), iv);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}

exports.decrypt = (encryptedText, KEY) => {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encrypted = textParts.join(':');

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(KEY, 'hex'), iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}