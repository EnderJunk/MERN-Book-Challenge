import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

interface User {
  username: string;
  email: string;
  id: string;
}



const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '2h';

// Updated to properly type the request parameter
export function authMiddleware( req: Request ) {
  // Allow token to be sent via headers
  let token = req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    if (token) {
      token = token ? (token.split(' ').pop()?.trim() || '') : ''; 
    }
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret) as { data: any };
    req.user = data;
  } catch (error) {
    console.log('Invalid token');
  }

  return req;
}

// Updated to take a user object instead of separate parameters
export function signToken(user: User) {
  const payload = {
    username: user.username,
    email: user.email,
    id: user.id,
  };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
