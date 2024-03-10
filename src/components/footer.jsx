"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CommandIcon, KeyboardIcon, LayoutGridIcon, MoonIcon, TriangleIcon } from "lucide-react"
import { Badge } from "./ui/badge"

export default function Footer() {
  return (
    <footer className="border-t border-gray-700">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between flex-col">
        <div className="flex space-x-6">
          <TriangleIcon className="h-5 w-5 " />
          <p className="text-sm ">© 2024</p>
          <Badge variant="secondary">All systems normal.</Badge>
        </div>
        <div className="flex space-x-6">
          <Link className="text-sm " href="#">
            Home
          </Link>
          <Link className="text-sm " href="#">
            Documentation
          </Link>
          <Link className="text-sm " href="#">
            Guides
          </Link>
          <Link className="text-sm " href="#">
            Help
          </Link>
          <Link className="text-sm " href="#">
            Contact Sales
          </Link>
          <Link className="text-sm " href="#">
            Blog
          </Link>
          <Link className="text-sm " href="#">
            Changelog
          </Link>
          <Link className="text-sm " href="#">
            Pricing
          </Link>
          <Link className="text-sm " href="#">
            Enterprise
          </Link>
          <Link className="text-sm " href="#">
            Legal
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">
            <CommandIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost">
            <KeyboardIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost">
            <MoonIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost">
            <LayoutGridIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </footer>
  )
}