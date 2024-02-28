'use client'
import React from 'react'
import { DataTable } from '../data-table/data-table'
import { Button } from '../ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'

const ArtistSongs = async ( { data, id }) => {
    const columns = [
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        SONG
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('title')}</div>,
            size: 2700,
            filterFn: 'fuzzy',
        },
        {
            accessorKey: 'total',
            size: 200,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        TOTAL STREAMS
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('total')}</div>,
            sortingFn: (a, b) => {
                // first we need to convert the strings to numbers and remove commas
                const aNum = parseInt(a?.original?.total?.replace(/,/g, ''))
                const bNum = parseInt(b?.original?.total?.replace(/,/g, ''))
                // then we can compare the numbers
                return aNum - bNum
            }
        },
        {
            accessorKey: 'daily',
            size: 10,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DAILY STREAMS
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('daily')}</div>,
            sortingFn: (a, b) => {
                // first we need to convert the strings to numbers and remove commas
                const aNum = parseInt(a?.original?.daily?.replace(/,/g, ''))
                const bNum = parseInt(b?.original?.daily?.replace(/,/g, ''))
                // then we can compare the numbers
                return aNum - bNum
            }
        }
    ]
    return (
        <div>
            <DataTable data={data} columns={columns} searchColumn={'title'} />
        </div>
    )
}

export default ArtistSongs