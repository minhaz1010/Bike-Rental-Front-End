import { CustomJwtPayload } from "@/types/jwt";
import { jwtDecode } from "jwt-decode";

export const decodeToken = <T extends CustomJwtPayload>(token: string): T => {
  return jwtDecode(token);
}