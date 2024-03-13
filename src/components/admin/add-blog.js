"use client"

import React, { useState } from 'react'
import { useRef } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import dynamic from 'next/dynamic';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBlogPostInDb } from '@/actions/actions';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { useConfig } from '@/hooks/use-config';
import { toast } from 'sonner';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


export default function AddBlog() {
  const editor = useRef(null);
  const formRef = useRef(null);
  const { theme: mode } = useTheme();

  return (
    <Card>
      <form ref={formRef} action={async (formData) => {
        formRef.current.reset()
        const { data, error } = await createBlogPostInDb(formData)
        if (error) {
          toast.error(error)
          return
        } else {
          toast.success('Blog added successfully')
        }
      }}>
        <CardContent>
          <div className='p-5'>
            <Input type="text" placeholder="Title" name="title" className="my-2" />
            <Input type="text" name="image" placeholder="Image Link" className="my-2" />
            <div className='flex justify-center my-3'>
              <Select name='pin'>
                <SelectTrigger className="w-[25%]">
                  <SelectValue placeholder="Pinned Post" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">
                    Yes
                  </SelectItem>
                  <SelectItem value="false">
                    No
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select name='status'>
                <SelectTrigger className="w-[25%]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">
                    Published
                  </SelectItem>
                  <SelectItem value="draft">
                    Draft
                  </SelectItem>

                </SelectContent>
              </Select>
            </div>

            <JoditEditor
              name="content"
              ref={editor}
              config={{ theme: mode }}
            ></JoditEditor>

          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Add</Button>
        </CardFooter>
      </form>
    </Card>

  )
}
