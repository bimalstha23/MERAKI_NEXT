import config from "config";
import jwt from "jsonwebtoken";

export const verifyJwt = <T>(
  token: string,
  key: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
  try {
    const publicKey = Buffer.from(config.get<string>(key), "base64").toString(
      "ascii"
    );
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
