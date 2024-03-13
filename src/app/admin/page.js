'use client';

import AddBlog from '@/components/admin/add-blog'
import CustomDialogTrigger from '@/components/customDialog'
import React from 'react'
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { checkUserRole } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';


export default function AdminPage() {
    const { isSignedIn: isAuthenticated, user, isLoaded } = useUser();
    if (isLoaded) {
        if (!isAuthenticated) {
            redirect('/')
        }
        const userRole = checkUserRole(user);
        if (userRole !== 'org:admin') {
            redirect('/dashboard')
        }
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
}
