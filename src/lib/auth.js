import 'server-only';
import { auth } from '@clerk/nextjs';

// Admins are listed explicitly by Clerk user id (ADMIN_USER_IDS, comma
// separated). Org roles are not trusted: any user may be able to create their
// own Clerk organization and be its admin.
const adminIds = () =>
    (process.env.ADMIN_USER_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);

export function isAdmin() {
    try {
        const { userId } = auth();
        return Boolean(userId) && adminIds().includes(userId);
    } catch (_) {
        // auth() throws when Clerk middleware didn't run for this request: fail closed
        return false;
    }
}

export function requireAdmin() {
    if (!isAdmin()) {
        throw new Error('Not authorized');
    }
}
