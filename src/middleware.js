import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";
export default function middleware(req) {
    return withAuth(req);
}
export const config = {
    matcher: ["/dashboard", "/charts", "/charts/(.*)", "/artist", "/artist/(.*)", "/album", "/album/(.*)", "/track", "/track/(.*)", "/search", "/search/(.*)", "/settings", "/settings/(.*)", "/api/(.*)", "/records", "/records/(.*)"],
};