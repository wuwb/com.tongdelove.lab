import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

/**
 * Encrypt the password
 *
 * @param password password
 */
export async function encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, bcrypt.genSaltSync());
}

/**
 * Check if the password is correct
 *
 * @param password password
 * @param passwordHash password of hash
 */
export async function checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
}

/**
 * Make salt
 */
export function makeSalt(): string {
    return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPasswordWithSalt(password: string, salt: string): string {
    if (!password || !salt) {
        return '';
    }
    const tempSalt = Buffer.from(salt, 'base64');
    return (
        // 10000 代表迭代次数 16代表长度
        crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
    );
}
