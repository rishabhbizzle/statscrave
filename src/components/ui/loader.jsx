import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className={"flex absolute top-0 justify-center items-center bottom-0 left-0 right-0 z-[1004]"}>
      <Loader2 className="mr-2 h-8 w-8 animate-spin" /> Loading
    </div>
  )
}

export default Loader