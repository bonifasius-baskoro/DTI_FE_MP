// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string;
      user: {
        userId: number;
        email: string;
        scope: string;
        
      } & DefaultSession["user"]
    }

    interface UserTokenDetails {
        accessToken: {
          claims: TokenClaims;
          value: string;
        };
      }
  
    interface User {
      roles: string;
      userId: number;
      token: UserTokenDetails;
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT extends TokenPayload {
        roles: string;
        accessToken: {
            claims: TokenClaims;
            value: string;
          };
      error?: string;
    }
    
  }