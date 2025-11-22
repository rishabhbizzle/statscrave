import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/updates", "/album(.*)", "/track(.*)", "/artist(.*)", "/charts(.*)", "/compare(.*)", "/records(.*)", "/privacy-policy", "/api(.*)"],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};