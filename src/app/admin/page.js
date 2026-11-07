'use client';

import AddBlog from '@/components/admin/add-blog'
import CustomDialogTrigger from '@/components/customDialog'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { isAdminAction } from '@/actions/actions';
import Loader from '@/components/ui/loader';


// The redirect here is only a convenience: every admin server action checks
// requireAdmin() itself, so calling them directly doesn't bypass anything.
export default function AdminPage() {
    const { isSignedIn: isAuthenticated, isLoaded } = useUser();
    const router = useRouter();
    const [allowed, setAllowed] = useState(null);

    useEffect(() => {
        if (!isLoaded) return;
        if (!isAuthenticated) {
            router.replace('/');
            return;
        }
        let cancelled = false;
        isAdminAction()
            .then((ok) => {
                if (cancelled) return;
                setAllowed(ok);
                if (!ok) router.replace('/dashboard');
            })
            .catch(() => { if (!cancelled) router.replace('/dashboard'); });
        return () => { cancelled = true; };
    }, [isLoaded, isAuthenticated, router]);

    if (!allowed) return <Loader />;

    return (
        <div className='min-h-screen'>
            <div>
                <CustomDialogTrigger
                    header={'Add Blog'}
                    description={'Add a new blog to the site'}
                    content={<AddBlog />}>
                    <Button>
                        Add Blog
                    </Button>
                </CustomDialogTrigger>
            </div>
        </div>
    )
}
