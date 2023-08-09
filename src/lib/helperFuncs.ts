import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALTROUNDS = 10
const SALT = bcrypt.genSaltSync(SALTROUNDS)
const SECRETKEY = 'HOLA' 

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, SALT)
}

export function unhashPassword(password: string, recordPass: string) {
  return bcrypt.compareSync(password, recordPass)
}

export function createToken(recordId: number | undefined): string {
  return jwt.sign({ userId: recordId }, SECRETKEY, {
    expiresIn: '1h',
  })
}
