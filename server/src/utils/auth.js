import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config.js';

const PRIVATE_KEY = config.jwt.privateKey;
const EXPIRES_IN = config.jwt.expiresIn;

export function verifyToken(token) {
  return jsonwebtoken.verify(token, PRIVATE_KEY);
}

export function generateToken(user) {
  return jsonwebtoken.sign({ ...user }, PRIVATE_KEY, { expiresIn: EXPIRES_IN });
}
