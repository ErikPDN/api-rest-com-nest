import { FastifyRequest } from 'fastify';

export interface TokenPayload {
  sub: string;
  username: string;
  email: string;
  exp: number;
  iat: number;
  aud: string;
}

export type AuthenticatedRequest = {
  userId: string;
} & FastifyRequest;
