import { Head, usePage } from "@inertiajs/react";
import Main from "../Layouts/Main";
import { useEffect } from "react";

export default function Detail() {
    const { post } = usePage().props;

    useEffect(() => {
        console.log(post);
    }, []);
    return (
        <Main>
            <Head title={`Posterer | ${post.title}`} />
            <div className="w-full shadow-lg min-h-52 p-4 flex flex-col my-4 rounded-md">
                <span className="font-semibold text-xl hover:underline">
                    {post.title}
                </span>
                <span>{post.author}</span>
                <div className="divide-x-2 text-slate-500 ">
                    <span className=" pr-2">{post.category}</span>
                    <span className="pl-2">{post.created_at}</span>
                </div>
                <span>{post.content}</span>
            </div>
        </Main>
    );
}
