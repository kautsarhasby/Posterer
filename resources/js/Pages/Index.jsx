import React, { useEffect, useState } from "react";
import Main from "../Layouts/Main";
import { Inertia } from "@inertiajs/inertia";
import { Search } from "lucide-react";
import { Paginator } from "../Components/Paginator";
import { Link, Head, usePage } from "@inertiajs/react";
import { faker } from "@faker-js/faker";

export default function PostIndex({ posts, session }) {
    const { author } = usePage().props;
    const [post, setPost] = useState(posts.data);
    const [text, setText] = useState("");
    const category = [
        { name: "Technology" },
        { name: "Lifestyle" },
        { name: "Education" },
        { name: "Health" },
    ];

    const image = faker.image.url();

    const searching = (e) => {
        const searchedPost = e.target.value.toLowerCase();
        setText(searchedPost);
    };

    const posted = post.filter((item) => {
        let lowerTitle = item.title.toLowerCase();
        if (text === "") {
            return post;
        } else if (lowerTitle.startsWith(text)) {
            return lowerTitle.startsWith(text);
        }
    });

    return (
        <Main>
            <Head title="Welcome to Posterer" />
            <main className="mb-10">
                <div className="bg-blueMain h-36 flex items-center justify-center">
                    <form className=" ml-auto mr-auto mb-10 max-w-3xl w-full relative ">
                        <Search
                            className="absolute top-3 left-3 text-slate-400"
                            size={16}
                        />
                        <input
                            className="p-2 pl-10  w-full outline-slate-200 outline outline-1 rounded-md"
                            type="text"
                            placeholder="Search Post"
                            aria-label="Search"
                            onChange={searching}
                        />
                    </form>
                </div>
                <div className="grid grid-cols-3">
                    <aside
                        className="pl-2 sticky top-24 mt-10 h-min
                    "
                    >
                        <span className="text-xl font-semibold">Category</span>
                        <div className="grid grid-rows-4 pl-4 text-blue-400">
                            {category.map((cat, index) => {
                                return (
                                    <div key={index}>
                                        <Link
                                            href={`/category/${cat.name.toLowerCase()}`}
                                            className="hover:text-blue-800  "
                                        >
                                            {cat.name}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                    <div className="w-full ">
                        {posted.length > 0 ? (
                            posted.map((post, index) => (
                                <div
                                    className="w-full shadow-md min-h-52 p-4 flex flex-col my-4 rounded-md"
                                    key={index}
                                >
                                    <img src={image} />
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
                                        <span className=" pr-2">
                                            {post.category}
                                        </span>
                                        <span className="pl-2">
                                            {post.created_at}
                                        </span>
                                    </div>
                                    <span>
                                        {post.content.substring(0, 30)}...
                                    </span>

                                    <Link
                                        href={`/posts/${post.slug}`}
                                        className="text-blue-400 hover:text-blue-800 self-end"
                                    >
                                        Read More &rsaquo;
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="w-full border my-4">No data</div>
                        )}
                    </div>
                    <aside
                        className="pl-2 sticky top-24 h-min  mt-10
                    "
                    >
                        <span className="text-xl font-semibold">Author</span>
                        <div className="grid grid-rows-4 text-blue-400">
                            {author.map((name, index) => {
                                return (
                                    <div key={index}>
                                        <Link
                                            href={`/author/${name.slug_author}`}
                                            className="hover:text-blue-800  "
                                        >
                                            {name.author}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </main>
            <div className="flex justify-center">
                <Paginator meta={posts.meta} />
            </div>
        </Main>
    );
}
