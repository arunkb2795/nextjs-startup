import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div>
                <Link href="/">NextEvents</Link>
            </div>
            <nav>
                <li><Link href="/events">Browse All Events</Link></li>
            </nav>
        </header>
    )
}
