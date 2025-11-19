'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function HeaderTitle() {
    const pathname = usePathname()
    const isRoot = pathname === '/'

    if (isRoot) {
        return <h1 className="text-4xl font-bold mb-2">Tordar Tømmervik</h1>
    }

    return (
        <Link href="/">
            <h1 className="text-4xl font-bold mb-2 cursor-pointer hover:opacity-80 transition-opacity">
                Tordar Tømmervik
            </h1>
        </Link>
    )
}

