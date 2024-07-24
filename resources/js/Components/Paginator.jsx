import { Link } from "@inertiajs/inertia-react";
import React from "react";

export const Paginator = ({ meta }) => {
    const currentPage = meta.current_page;
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    return (
        <div className=" text-white rounded-md border text-xl bg-slate-800">
            {prev ? (
                <Link href={prev} className="p-2">
                    &lsaquo;
                </Link>
            ) : (
                <span className="p-2 text-slate-800">&lsaquo;</span>
            )}

            <span className="p-2 ">{currentPage}</span>
            {next ? (
                <Link href={next} className="p-2">
                    &rsaquo;
                </Link>
            ) : (
                <span className="p-2 text-slate-800">&rsaquo;</span>
            )}
        </div>
    );
};
