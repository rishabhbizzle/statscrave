import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    afterAuth(auth, req, evt) {
        // Handle users who aren't authenticated
        if (!auth.userId) {
            return redirectToSignIn();
        }
    }
});

export const config = {
    matcher: ["/dashboard"],
};