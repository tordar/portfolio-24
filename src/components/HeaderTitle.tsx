'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function HeaderTitle() {
    const pathname = usePathname()
    const isRoot = pathname === '/'

    if (isRoot) {
        return <h1 className="text-5xl md:text-6xl font-semibold mb-3 tracking-tight">Tordar Tømmervik</h1>
    }

    return (
        <Link href="/">
            <h1 className="text-5xl md:text-6xl font-semibold mb-3 tracking-tight cursor-pointer hover:opacity-75 transition-opacity duration-200">
                Tordar Tømmervik
            </h1>
        </Link>
    )
}

