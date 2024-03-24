import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/updates", "/updates/(*)"],
    debug: true
});

export const config = {
    matcher: ["/dashboard", "/user-profile"],
};