import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: { userId: number }
    }
  }
}
const SECRETKEY = 'HOLA'
interface DecodedToken {
  userId: string
}

function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing' })
  }

  try {
    const decodedToken = jwt.verify(
      token?.split(' ')[1],
      SECRETKEY
    ) as DecodedToken
    req.user = {
      userId: parseInt(decodedToken.userId),
    }
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' })
  }
  return undefined
}

export default authenticateToken
