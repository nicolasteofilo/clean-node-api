/* eslint-disable @typescript-eslint/require-await */
import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/cryptography/decrypter'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt(value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return new Promise((resolve) => resolve(null))
  }
}
