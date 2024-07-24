import { usePage, Link, Head } from "@inertiajs/react";
import Main from "../Layouts/Main";

import React from "react";

export default function (props) {
    const { auth, posts, author } = usePage().props;

    console.log(props);

    return (
        <Main>
            <Head title={`Posterer | Posted by ${author}`} />
            <div className="text-xl font-semibold text-center border">
                Posted by {author}
            </div>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div
                        className="w-full shadow-lg min-h-52 p-4 flex flex-col my-4 rounded-md"
                        key={index}
                    >
                        <Link
                            className="font-semibold text-xl hover:underline"
                            href={`/posts/${post.slug}`}
                        >
                            {post.title}
                        </Link>
                        <Link
                            className="hover:underline"
                            href={`/author/${post.slug_author}`}
                        >
                            {post.author}
                        </Link>
                        <div className="divide-x-2 text-slate-500 ">
                            <span className=" pr-2">{post.category}</span>
                            <span className="pl-2">{post.created_at}</span>
                        </div>
                        <span>{post.content.substring(0, 30)}...</span>
                    </div>
                ))
            ) : (
                <div className="w-full border my-4">No data</div>
            )}
        </Main>
    );
}
