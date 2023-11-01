'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const pages: { label: string; route: string }[] = [
	{ label: 'Home', route: '/' },
	{ label: 'Issues', route: '/issues' },
]

const activeClass = 'text-sm font-medium transition-colors hover:text-primary'
const inactiveClass = 'text-sm font-medium text-gray-500 transition-colors hover:text-primary'

const NavBar = () => {
	const pathname = usePathname()
	return (
		<nav className="border-b py-3 px-6 flex items-center justify-between">
			<div className="flex items-center space-x-6 lg:space-x-10">
				{pages.map((p) => {
					const isActive = pathname === p.route
					return (
						<Link key={p.label} href={p.route} className={isActive ? activeClass : inactiveClass}>
							{p.label}
						</Link>
					)
				})}
			</div>
			<Link href="/">?</Link>
		</nav>
	)
}

export default NavBar
