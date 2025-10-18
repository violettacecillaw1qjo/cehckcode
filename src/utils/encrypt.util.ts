import jwt from 'jsonwebtoken';

export const jwtDecode = (data: string) => (data ? jwt.decode(data) : null);
