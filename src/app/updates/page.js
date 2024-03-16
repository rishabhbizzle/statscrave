import { getAllBlogsFromDb } from '@/actions/actions'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/helperFunctions'
import { PinIcon, Sparkle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = async () => {
    const blogs = await getAllBlogsFromDb()
    const pinnedBlog = blogs.find(blog => blog.pin === true)
    return (
        <div className='min-h-screen container'>
            <div className="flex items-center flex-col justify-between space-y-2 my-8 gap-2">
                <div className='flex gap-2 items-center'>
                    <Sparkle className='w-6 h-6' />
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Updates</h2>
                </div>
                <p className="text-muted-foreground text-center">
                   Wanna know whats new in pop music culture? Check out these latest updates to stay in the loop.
                </p>
                <div className="flex items-center space-x-2">
                    {/* <Button onClick={() => console.log("test")}>Download</Button> */}
                </div>
            </div>
            <div>
                <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[25rem]">
                    <BentoGridItem
                        title={<Link className='w-full flex hover:underline' href={`/updates/${pinnedBlog.slug}`}>{pinnedBlog.title}</Link>}
                        // description={<Link className='w-full flex justify-end' href={`/updates/${pinnedBlog.slug}`}><Button>Read More</Button></Link>}
                        description={formatDate(pinnedBlog.createdAt)}
                        header={<img
                            alt="Cover image"
                            className="aspect-video overflow-hidden rounded-lg object-cover w-full h-full"
                            src={pinnedBlog.image}
                        />}
                        icon={<PinIcon size={20} />}
                        className={"md:col-span-2"}
                    />
                    {blogs.map((blog, i) => {
                        if (blog?._id === pinnedBlog?._id) return null
                        return <BentoGridItem
                            key={i}
                            title={<Link className='h-20 flex  hover:underline' href={`/updates/${blog.slug}`}>{blog.title}</Link>}
                            description={formatDate(blog.createdAt)}
                            header={<img
                                alt="Cover image"
                                className="aspect-video overflow-hidden rounded-lg object-cover h-full"
                                src={blog.image}
                            />}
                            className={"md:col-span-1"}
                        />
                    })}
                </BentoGrid>
            </div>
        </div>

    )
}

export default Page