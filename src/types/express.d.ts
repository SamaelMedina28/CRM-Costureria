import { JwtPayload } from "jsonwebtoken";

interface AuthPayload extends JwtPayload {
  id: string; // o number, dependiendo de tu BD
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
