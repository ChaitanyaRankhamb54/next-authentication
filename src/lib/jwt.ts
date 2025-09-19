import jwt from "jsonwebtoken";

export default function generateToken(
  payload: string | object | Buffer,
  secret: string,
  options?: jwt.SignOptions
) {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    ...(options || {})
  });
}


