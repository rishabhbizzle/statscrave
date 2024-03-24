"use client"


import React from 'react'
import Album from '@/components/charts/Album'
import Artist from '@/components/charts/Artist'
import Global from '@/components/charts/Global'
import Hot100 from '@/components/charts/Hot100'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Info } from 'lucide-react'
import Link from 'next/link'

const chartMap = {
  'hot100': <Hot100 />,
  'album200': <Album />,
  'artist100': <Artist />,
  'global200': <Global />,
}

const Chart = ({ params }) => {
  const chartName = params.name
  if (!chartMap[chartName]) {
    return notFound()
  }

  return (
    <div className='md:p-10 min-h-screen'>
      <Card>
        <CardHeader>
          <CardTitle>BILLBOARD {chartName?.toUpperCase()} Chart</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This chart is a property of
              <Link href="https://www.billboard.com/" className='mx-1 font-semibold' target='_blank'>
                Billboard
              </Link>
              and are used for educational purposes only. We do not own any of the data presented here. All rights reserved to the respective owners.
            </AlertDescription>
          </Alert>
          <Card className="mt-5">
            {chartMap[chartName]}
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

export default Chart