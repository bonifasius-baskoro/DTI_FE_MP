import { JwtPayload } from "jwt-decode";


export interface TokenPair{
    accessToken: string;
}
// interface TokenPayload {
//     iss: string;
//     sub: string;
//     exp: number;
//     iat: number;
//     userId: number;
//     scope: string;
//   }

  export interface TokenClaims extends JwtPayload {
    userId: string;
    scope: string;
  }
  

  export interface LoginResponse {
    statusCode: number;
    messages: string[];
    data: TokenPair;
  }