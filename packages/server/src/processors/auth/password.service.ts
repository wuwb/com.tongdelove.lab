import { Injectable } from "@nestjs/common";
import * as hasher from 'wordpress-hash-node';

/** Salt or number of rounds to generate a salt */
export type Salt = string | number;

const BCRYPT_SALT_VAR = "BCRYPT_SALT";
const UNDEFINED_SALT_OR_ROUNDS_ERROR = `${BCRYPT_SALT_VAR} is not defined`;
const SALT_OR_ROUNDS_TYPE_ERROR = `${BCRYPT_SALT_VAR} must be a positive integer or text`;

@Injectable()
export class PasswordService {

    /**
     * the salt to be used to hash the password. if specified as a number then a
     * salt will be generated with the specified number of rounds and used
     */
    salt: Salt;

    compare(password: string, encrypted: string): boolean {
        return hasher.CheckPassword(password, encrypted);
    }


    /**
     * @param password the password to be encrypted
     * @return encrypted password
     */
    hash(password: string): string {
        return hasher.HashPassword(password);
    }
}

/**
 * Parses a salt environment variable value.
 * If a number string value is given tries to parse it as a number of rounds to generate a salt
 * @param value salt environment variable value
 * @returns salt or number of rounds to generate a salt
 */
export function parseSalt(value: string | undefined): Salt {
    if (value === undefined) {
        throw new Error(UNDEFINED_SALT_OR_ROUNDS_ERROR);
    }

    const rounds = Number(value);

    if (Number.isNaN(rounds)) {
        return value;
    }
    if (!Number.isInteger(rounds) || rounds < 0) {
        throw new Error(SALT_OR_ROUNDS_TYPE_ERROR);
    }
    return rounds;
}
