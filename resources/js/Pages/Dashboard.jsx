import React, { useEffect, useState } from "react";
import Main from "../Layouts/Main";
import { Inertia } from "@inertiajs/inertia";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { Message } from "../Components/Message";
import { useForm, usePage, Head } from "@inertiajs/react";
import { ErrorMessage } from "../Components/ErrorMessage";

function Dashboard(props) {
    const [notify, setNotify] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data, setData, processing } = useForm({
        title: "",
        content: "",
        category: "",
    });

    const { errors, auth, posts } = usePage().props;
    const { url } = usePage();
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        Inertia.post(
            "/",
            { ...data, author: auth.name },
            {
                onError: (error) => {
                    console.log("gagal mengupdate :", error);
                    setError(true);
                },
            }
        );

        setLoading(true);
    };

    const handleDelete = (id) => {
        Inertia.delete(`${id}`, {
            onSuccess: () => {
                console.log("Resource deleted successfully");
            },
            onError: (errors) => {
                console.error("Error deleting resource:", errors);
            },
        });
    };

    const handleEdit = (id) => {
        Inertia.get(`/${id}/edit`);
    };

    useEffect(() => {
        const errorslength = Object.keys(errors).length;
        if (props.flash.message) {
            setLoading(false);
            setNotify(true);
            setTimeout(() => {
                setNotify(false);
            }, 3000);
        }
        if (errorslength > 0) {
            setError(true);
            setLoading(false);
            setNotify(true);
            setTimeout(() => {
                setNotify(false);
            }, 3000);
        }
        props.flash.message = null;
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(url.split("?")[1]);
        let tabToken = params.get("tab_token");
        if (tabToken) {
            localStorage.setItem("tab_token", tabToken);
        }
    }, []);

    const resetButton = () => {
        setData({
            title: "",
            content: "",
            category: "",
        });
    };

    return (
        <Main>
            <Head title="Dashboard" />
            <main className="mt-10 transition ">
                {loading && <LoadingSpinner />}
                {notify && <Message error={error} />}
                <div className="shadow-lg max-w-5xl  ml-auto mr-auto  p-4">
                    <span className="font-bold text-lg ">Tambah Post</span>
                    <div action="" className="flex flex-col gap-y-2 mt-2">
                        <input
                            type="text"
                            name="title"
                            placeholder="Judul"
                            id="title"
                            className="outline-1 outline-slate-300 outline p-2 rounded-md"
                            onChange={(e) => setData("title", e.target.value)}
                            value={data.title}
                        />
                        {errors.title && (
                            <ErrorMessage>{errors.title}</ErrorMessage>
                        )}
                        <textarea
                            type="text"
                            name="content"
                            placeholder="Content"
                            id="content"
                            className="outline-1 outline-slate-300 outline p-2 rounded-md resize-none"
                            rows={4}
                            onChange={(e) => setData("content", e.target.value)}
                            value={data.content}
                        ></textarea>
                        {errors.content && (
                            <ErrorMessage>{errors.content}</ErrorMessage>
                        )}
                        <select
                            name="category"
                            id="category"
                            className="outline-1 outline-slate-300 outline p-2 rounded-md"
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                            value={data.category}
                        >
                            <option value="" disabled>
                                Choose Category
                            </option>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Education">Education</option>
                            <option value="Health">Health</option>
                        </select>
                        {errors.category && (
                            <ErrorMessage>{errors.category}</ErrorMessage>
                        )}
                        <div className="flex gap-2 mt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-slate-900 text-white font-semibold rounded-md p-2  hover:bg-white hover:text-slate-900 hover:outline hover:outline-1 hover:outline-slate-900"
                                onClick={handleSubmit}
                            >
                                Add Post
                            </button>
                            <button
                                type="submit"
                                onClick={resetButton}
                                disabled={processing}
                                className="bg-slate-600 text-white font-semibold rounded-md p-2 hover:bg-white hover:text-slate-900 hover:outline hover:outline-1 hover:outline-slate-600"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <div className="mt-10 px-10 ">
                <div className="justify-center flex text-xl font-semibold">
                    Post that you posted
                </div>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div
                            className="w-full shadow-lg min-h-52 p-4 flex flex-col my-4 rounded-md"
                            key={index}
                        >
                            <span className="font-semibold text-xl ">
                                {post.title}
                            </span>
                            <span>{post.author}</span>
                            <div className="divide-x-2 text-slate-500 ">
                                <span className=" pr-2">{post.category}</span>
                                <span className="pl-2">{post.created_at}</span>
                            </div>
                            <span>{post.content}</span>
                            <div className="self-end ">
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="p-2 text-red-500"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(post.id)}
                                    className="p-2 text-blue-700"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center">No data</div>
                )}
            </div>
        </Main>
    );
}

export default Dashboard;
