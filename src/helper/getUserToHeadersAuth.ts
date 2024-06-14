import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const getUserIdToHeadersAuth = (body) => {
  const authHeader = body.authorization;
  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];
  if (bearer !== 'Bearer' || !token) {
    throw new ForbiddenException('The user is not authorized');
  }

  const jwt = new JwtService();

  const user = jwt.verify(token, {
    secret: process.env.JWT_SECRET_KEY,
  });

  return user.id;
};
