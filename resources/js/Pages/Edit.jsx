import React, { useEffect, useState } from "react";
import Main from "../Layouts/Main";
import { Inertia } from "@inertiajs/inertia";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { Message } from "../Components/Message";

const Edit = (props) => {
    const [data, setData] = useState(props.post);
    const [notify, setNotify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        Inertia.patch(`/posts/${data.id}`, data, {
            onSuccess: () => {
                console.log("berhasil Mengupdate");
            },
            onError: (error) => {
                console.log("gagal mengupdate :", error);
                setError(true);
            },
        });

        setData({ title: "", content: "" });
        setLoading(true);
    };

    useEffect(() => {
        if (
            (!props.flash.message && props.errors.error) ||
            props.flash.message
        ) {
            setLoading(false);
            setNotify(true);
            setTimeout(() => {
                setNotify(false);
            }, 3000);
        }
        props.flash.message = null;
    }, [props.flash.message, loading, error, props.error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    return (
        <Main>
            <main className="mt-10 transition ">
                {loading && <LoadingSpinner />}
                {notify && <Message error={error} />}
                <div className="shadow-lg max-w-5xl  ml-auto mr-auto  p-4">
                    <span className="font-bold text-lg ">Edit Post</span>
                    <div action="" className="flex flex-col gap-y-2 mt-2">
                        <input
                            type="text"
                            name="title"
                            placeholder="Judul"
                            id="title"
                            className="outline-1 outline-slate-300 outline p-2 rounded-md"
                            onChange={handleChange}
                            value={data.title}
                        />
                        <textarea
                            type="text"
                            name="content"
                            placeholder="Content"
                            id="content"
                            className="outline-1 outline-slate-300 outline p-2 rounded-md resize-none"
                            rows={4}
                            onChange={handleChange}
                            value={data.content}
                        ></textarea>
                        <div className="mt-2">
                            <button
                                type="submit"
                                className="bg-slate-900 text-white font-semibold rounded-md p-2  hover:bg-white hover:text-slate-900 hover:outline hover:outline-1 hover:outline-slate-900"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </Main>
    );
};

export default Edit;
