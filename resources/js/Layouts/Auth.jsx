import React from "react";
import { Newspaper } from "lucide-react";
import { Link } from "@inertiajs/react";
export function Auth({ children, link, textLink, title }) {
    return (
        <main className="flex items-center justify-center h-screen bg-slate-100">
            <div className="max-w-xl rounded-md shadow-lg w-full h-auto p-4 bg-white text-center ">
                <Newspaper size={46} className="ml-auto mr-auto " />
                <div className="font-semibold text-xl my-4">{title}</div>
                <div className="grid grid-rows-1">
                    {children}
                    <div className=" mt-10 ">
                        <hr className="border-black border mb-2" />
                        <Link href={link} className="hover:text-red-500">
                            {textLink}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
