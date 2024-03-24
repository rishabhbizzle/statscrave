import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
    matcher: ["/dashboard", "/user-profile"],
};