import React, { useState } from "react";

import { Link, usePage } from "@inertiajs/react";
import { UserIcon } from "lucide-react";
import Footer from "./Footer";

function Layout({ children }) {
    const [open, setOpen] = useState(false);
    const { auth } = usePage().props;

    return (
        <main className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10">
                <nav className="bg-slate-900 text-white p-4 flex justify-between">
                    <div className="flex items-center gap-4">
                        <Link className=" text-xl font-semibold" href="/">
                            Posterer
                        </Link>
                        <ul className="flex gap-4">
                            <li className="text-slate-300 font-medium">
                                <Link className="nav-link" href="/">
                                    Home
                                </Link>
                            </li>
                            <li className="text-slate-300 font-medium">
                                <Link className="nav-link" href="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-4">
                        <span>{auth ? auth.name : "Not Sign in"}</span>
                        <button
                            className="rounded-full border-white border p-2"
                            onClick={() => setOpen(!open)}
                        >
                            <UserIcon />
                        </button>
                    </div>
                </nav>
                {open && (
                    <div className="absolute h-auto w-36 shadow-xl p-4 bg-slate-50 rounded-md right-0 z-10">
                        <div className="grid divide-y-[1px] divide-slate-300 text-slate-600">
                            <span>Dashboard</span>
                            <span>Profile</span>
                            {auth ? (
                                <Link
                                    href="/logout"
                                    className="hover:text-blue-400"
                                >
                                    Log out
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="hover:text-blue-400"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <div className="">{children}</div>
            <Footer />
        </main>
    );
}

export default Layout;
