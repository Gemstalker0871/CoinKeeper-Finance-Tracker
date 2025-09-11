import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import dotenv from "dotenv";

dotenv.config();

export const clerkMiddleware = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});