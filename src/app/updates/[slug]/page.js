import { getBlogPostFromDb } from '@/actions/actions'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatDate } from '@/lib/helperFunctions'
import { Sparkle, Sparkles, User } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'





export default async function Page({ params }) {
    const slug = decodeURIComponent(params.slug)
    const blog = await getBlogPostFromDb(slug)
    const styledContent = blog.content.replace(/color:#0e101a/g, '')

    return (
        <>
        <Head>
            <title>{blog.title}</title>
            <meta property="og:title" content={blog.title} />
            <meta property="og:image" content={blog.image} />
        </Head>
        <div className="py-6 md:py-10 lg:py-12">
            <div className="grid max-w-7xl gap-6 px-4 mx-auto lg:grid-cols-12 md:px-6">
                <div className="space-y-4 lg:col-start-4 lg:col-span-6 lg:space-y-8 lg:order-2">
                    <div className="space-y-2">
                        <div className='flex items-center gap-1'>
                            <Sparkles className="w-4 h-4" />
                            <p className="text-base font-medium tracking-tight sm:text-sm">
                                Update
                            </p>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
                            {blog.title}
                        </h1>
                        <div className='flex justify-between items-center'>
                            <p className="text-gray-500 dark:text-gray-400">{formatDate(blog.createdAt)}</p>
                            {blog?.author && (
                                <div className='flex justify-center items-center gap-2'>
                                    <Avatar className="h-9 w-9">
                                        {/* <AvatarImage src={user?.picture} alt="user_img" /> */}
                                        <AvatarFallback><User/></AvatarFallback>
                                    </Avatar>
                                    <p>{blog.author}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='text-end'>
                    <img
                        alt="Cover image"
                        className="aspect-video overflow-hidden rounded-lg object-cover"
                        height={340}
                        src={blog.image}
                        width={1250}
                        />
                        <Link className='text-sm opacity-60 text-secondary-foreground underline' href={blog?.image}>Image Source</Link>
                        </div>
                    <div className="dark:text-white  max-w-none mx-auto lg:max-w-6xl p-2" dangerouslySetInnerHTML={{ __html: styledContent }}>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}
