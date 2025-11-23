import Link from "next/link"

const { Button } = require("@/components/ui/button")
const { CaretSortIcon } = require("@radix-ui/react-icons")

export const columnsData = {
    songs: [
        {
            accessorKey: "#",
            header: ({ column }) => {
                return (
                    <div
                        variant="ghost"
                    >
                        #
                    </div>
                )
            },
            cell: (row, index) => {
                return row?.row?.index + 1
            },
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        SONG NAME
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                if (row?.original?.id) {
                    return <Link className="hover:underline font-medium" href={`/track/${row?.original?.id}`}>{row.getValue('title')}</Link>
                } else {
                    return <div className="font-medium">{row.getValue('title')}</div>
                }
            },
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        TOTAL
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DAILY
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
        },
        {
            accessorKey: 'nextMilestone',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        NEXT MILESTONE
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                try {
                    const total = parseInt(row.getValue('total')?.replace(/,/g, '') || '0');
                    const nextMilestone = Math.ceil(total / 100000000) * 100000000;
                    return <div className="">{nextMilestone.toLocaleString()}</div>;
                } catch (error) {
                    return <div>N/A</div>;
                }
            },
            sortingFn: (a, b) => {
                try {
                    const aTotal = parseInt(a?.original?.total?.replace(/,/g, '') || '0');
                    const bTotal = parseInt(b?.original?.total?.replace(/,/g, '') || '0');
                    const aMilestone = Math.ceil(aTotal / 100000000) * 100000000;
                    const bMilestone = Math.ceil(bTotal / 100000000) * 100000000;
                    return aMilestone - bMilestone;
                } catch (error) {
                    return 0;
                }
            }
        },
        {
            accessorKey: 'eta',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ETA
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                try {
                    const total = parseInt(row.getValue('total')?.replace(/,/g, '') || '0');
                    const daily = parseInt(row.getValue('daily')?.replace(/,/g, '') || '0');
                    if (daily === 0) return <div>N/A</div>;

                    const nextMilestone = Math.ceil(total / 100000000) * 100000000;
                    const daysLeft = Math.round((nextMilestone - total) / daily);
                    const etaDate = new Date();
                    etaDate.setDate(etaDate.getDate() + daysLeft);

                    return <div className="">{etaDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>;
                } catch (error) {
                    return <div>N/A</div>;
                }
            },
            sortingFn: (a, b) => {
                try {
                    const aTotal = parseInt(a?.original?.total?.replace(/,/g, '') || '0');
                    const aDaily = parseInt(a?.original?.daily?.replace(/,/g, '') || '0');
                    const bTotal = parseInt(b?.original?.total?.replace(/,/g, '') || '0');
                    const bDaily = parseInt(b?.original?.daily?.replace(/,/g, '') || '0');

                    if (aDaily === 0) return 1;
                    if (bDaily === 0) return -1;

                    const aMilestone = Math.ceil(aTotal / 100000000) * 100000000;
                    const aDays = (aMilestone - aTotal) / aDaily;

                    const bMilestone = Math.ceil(bTotal / 100000000) * 100000000;
                    const bDays = (bMilestone - bTotal) / bDaily;

                    return aDays - bDays;
                } catch (error) {
                    return 0;
                }
            }
        },
        {
            accessorKey: 'daysLeft',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DAYS LEFT
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                try {
                    const total = parseInt(row.getValue('total')?.replace(/,/g, '') || '0');
                    const daily = parseInt(row.getValue('daily')?.replace(/,/g, '') || '0');
                    if (daily === 0) return <div>N/A</div>;

                    const nextMilestone = Math.ceil(total / 100000000) * 100000000;
                    const daysLeft = Math.round((nextMilestone - total) / daily);

                    return <div className="">{daysLeft.toLocaleString()}</div>;
                } catch (error) {
                    return <div>N/A</div>;
                }
            },
            sortingFn: (a, b) => {
                try {
                    const aTotal = parseInt(a?.original?.total?.replace(/,/g, '') || '0');
                    const aDaily = parseInt(a?.original?.daily?.replace(/,/g, '') || '0');
                    const bTotal = parseInt(b?.original?.total?.replace(/,/g, '') || '0');
                    const bDaily = parseInt(b?.original?.daily?.replace(/,/g, '') || '0');

                    if (aDaily === 0) return 1;
                    if (bDaily === 0) return -1;

                    const aMilestone = Math.ceil(aTotal / 100000000) * 100000000;
                    const aDays = (aMilestone - aTotal) / aDaily;

                    const bMilestone = Math.ceil(bTotal / 100000000) * 100000000;
                    const bDays = (bMilestone - bTotal) / bDaily;

                    return aDays - bDays;
                } catch (error) {
                    return 0;
                }
            }
        }
    ],
    album: [
        {
            accessorKey: "#",
            header: ({ column }) => {
                return (
                    <div
                        variant="ghost"
                    >
                        #
                    </div>
                )
            },
            cell: (row, index) => {
                return row?.row?.index + 1
            },
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ALBUM NAME
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                if (row?.original?.id) {
                    return <Link className="hover:underline font-medium" href={`/album/${row?.original?.id}`}>{row.getValue('title')}</Link>
                } else {
                    return <div className="font-medium">{row.getValue('title')}</div>
                }
            },
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        TOTAL
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DAILY
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
    ],


    artist: [
        {
            accessorKey: "#",
            header: ({ column }) => {
                return (
                    <div
                        variant="ghost"
                    >
                        #
                    </div>
                )
            },
            cell: (row, index) => {
                return row?.row?.index + 1
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ARTIST NAME
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                if (row?.original?.id) {
                    return <Link className="hover:underline font-medium" href={`/artist/${row?.original?.id}`}>{row.getValue('name')}</Link>
                } else {
                    return <div className="font-medium">{row.getValue('name')}</div>
                }
            },
            size: 300,
            filterFn: 'fuzzy',
        },
        {
            accessorKey: 'total',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        TOTAL
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DAILY
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
        },
        {
            accessorKey: 'lead',
            size: 10,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        LEAD
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('lead')}</div>,
            sortingFn: (a, b) => {
                // first we need to convert the strings to numbers and remove commas
                const aNum = parseInt(a?.original?.lead?.replace(/,/g, ''))
                const bNum = parseInt(b?.original?.lead?.replace(/,/g, ''))
                // then we can compare the numbers
                return aNum - bNum
            }
        }, {
            accessorKey: 'feature',
            size: 10,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        FEAT.
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('feature')}</div>,
            sortingFn: (a, b) => {
                // first we need to convert the strings to numbers and remove commas
                const aNum = parseInt(a?.original?.feature?.replace(/,/g, ''))
                const bNum = parseInt(b?.original?.feature?.replace(/,/g, ''))
                // then we can compare the numbers
                return aNum - bNum
            }
        }
    ],
    album2: [
        {
            accessorKey: "#",
            header: ({ column }) => {
                return (
                    <div
                        variant="ghost"
                    >
                        #
                    </div>
                )
            },
            cell: (row, index) => {
                return row?.row?.index + 1
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                    >
                        NAME
                    </Button>
                )
            },
            cell: ({ row }) => {
                if (row?.original?.id) {
                    return <Link className="hover:underline font-medium" href={`/album/${row?.original?.id}`}>{row.getValue('name')}</Link>
                } else {
                    return <div className="font-medium">{row.getValue('name')}</div>
                }
            },
            size: 2700,
            filterFn: 'fuzzy',
        },
        {
            accessorKey: "artist",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                    >
                        ARTIST
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('artist')}</div>,
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
                        className="px-1 md:px-3"
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
                        className="px-1 md:px-3"
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
    ],
    track: [
        {
            accessorKey: "#",
            header: ({ column }) => {
                return (
                    <div
                        variant="ghost"
                    >
                        #
                    </div>
                )
            },
            cell: (row, index) => {
                return row?.row?.index + 1
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                    >
                        NAME
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('name')}</div>,
            size: 2700,
            filterFn: 'fuzzy',
        },
        {
            accessorKey: "artist",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                    >
                        ARTIST
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('artist')}</div>,
            size: 2700,
            filterFn: 'fuzzy',
        },
        {
            accessorKey: 'streams',
            size: 200,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        STREAMS
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('streams')}</div>,
            sortingFn: (a, b) => {
                // first we need to convert the strings to numbers and remove commas
                const aNum = parseInt(a?.original?.streams?.replace(/,/g, ''))
                const bNum = parseInt(b?.original?.streams?.replace(/,/g, ''))
                // then we can compare the numbers
                return aNum - bNum
            }
        },
    ],
    monthlyListeners: [
        {
            accessorKey: "#",
            header: ({ column }) => {
                return (
                    <div
                    >
                        #
                    </div>
                )
            },
            cell: (row, index) => {
                return row?.row?.index + 1
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                    >
                        ARTIST NAME
                    </Button>
                )
            },
            cell: ({ row }) => {
                if (row?.original?.id) {
                    return <Link className="hover:underline font-medium" href={`/artist/${row?.original?.id}`}>{row.getValue('name')}</Link>
                } else {
                    return <div className="font-medium">{row.getValue('name')}</div>
                }
            },
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        TOTAL
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DAILY
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className={parseInt(row.getValue('daily')?.replace(/,/g, '')) > 0 ? "text-green-500" : "text-red-500"}>{row.getValue('daily')}</div>,
            sortingFn: (a, b) => {
                // first we need to convert the strings to numbers and remove commas
                const aNum = parseInt(a?.original?.daily?.replace(/,/g, ''))
                const bNum = parseInt(b?.original?.daily?.replace(/,/g, ''))
                // then we can compare the numbers
                return aNum - bNum
            }
        },
        {
            accessorKey: 'peak',
            size: 10,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        PEAK
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue('peak')}</div>,
            sortingFn: (a, b) => {
                // first we need to convert the strings to numbers and remove commas
                const aNum = parseInt(a?.original?.peak?.replace(/,/g, ''))
                const bNum = parseInt(b?.original?.peak?.replace(/,/g, ''))
                // then we can compare the numbers
                return aNum - bNum
            }
        }
    ],
    ytViews: [
        {
            accessorKey: "#",
            header: ({ column }) => {
                return (
                    <div
                        variant="ghost"
                    >
                        #
                    </div>
                )
            },
            cell: (row, index) => {
                return row?.row?.index + 1
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="px-1 md:px-3"
                    >
                        VIDEO TITLE
                    </Button>
                )
            },
            cell: ({ row }) => {
                if (row?.original?.id) {
                    return <Link className="hover:underline font-medium" href={`/album/${row?.original?.id}`}>{row.getValue('name')}</Link>
                } else {
                    return <div className="font-medium">{row.getValue('name')}</div>
                }
            },
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        TOTAL VIEWS
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
                        className="px-1 md:px-3"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DAILY VIEWS
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue('daily') ? row.getValue('daily') : '-'}</div>,
            sortingFn: (a, b) => {
                // first we need to convert the strings to numbers and remove commas
                const aNum = parseInt(a?.original?.daily?.replace(/,/g, ''))
                const bNum = parseInt(b?.original?.daily?.replace(/,/g, ''))
                // then we can compare the numbers
                return aNum - bNum
            }
        }
    ],

}