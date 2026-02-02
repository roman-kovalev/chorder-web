import {Link, Outlet} from "react-router";
import {routes} from "~/routes";

function Header() {
    return (
        <header className="border-b px-4 py-3">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-xl font-semibold">My Chords & Lyrics</h1>
                {/* later: search bar, profile, etc */}
            </div>
        </header>
    );
}

function Sidebar() {
    return (
        <aside className="w-64 border-r px-4 py-4">
            <nav className="space-y-2 text-m">
                <ul>
                    <li>
                        <Link to={routes.artistList()}>Artists</Link>
                    </li>
                    <li>
                        <Link to={routes.songList()}>Songs</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

function Footer() {
    return (
        <footer className="border-t px-4 py-3 text-sm text-gray-500">
            <div className="container mx-auto">
                © {new Date().getFullYear()} My Chords & Lyrics
            </div>
        </footer>
    );
}

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <div className="flex flex-1">
                <Sidebar/>

                <main className="flex-1 px-4 py-4">
                    <Outlet/>
                </main>
            </div>

            <Footer/>
        </div>
    );
}