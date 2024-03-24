import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/updates"],
});

export const config = {
    matcher: ["/dashboard", "/user-profile"],
};