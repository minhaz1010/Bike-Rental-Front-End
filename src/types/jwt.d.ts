import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
  email?:string
}
