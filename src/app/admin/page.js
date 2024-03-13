import AddBlog from '@/components/admin/add-blog'
import CustomDialogTrigger from '@/components/customDialog'
import React from 'react'
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';


export default async function AdminPage() {
    // const { getUser, isAuthenticated, getPermission } = getKindeServerSession()
    // const isLoggedIn = await isAuthenticated()
    // if (!isLoggedIn) {
    //     redirect('/api/auth/login')
    // }
    // const requiredPermission = await getPermission('admin:role')
    // if (!requiredPermission.isGranted) {
    //     redirect('/dashboard')
    // }
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
