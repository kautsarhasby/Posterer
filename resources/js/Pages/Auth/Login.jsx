import { Inertia } from "@inertiajs/inertia";
import { Head, useForm, usePage } from "@inertiajs/react";

import React from "react";
import { Auth } from "../../Layouts/Auth";
import { ErrorMessage } from "../../Components/ErrorMessage";

export default function Login() {
    const { data, setData, processing } = useForm({
        email: "",
        password: "",
    });
    const { errors } = usePage().props;
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("login", data);
    };

    return (
        <Auth link={"/register"} textLink={"Create Account"} title={"Sign in"}>
            <Head title="Sign in" />
            <form
                action=""
                className="flex flex-col gap-4"
                method="POST"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="outline-slate-200 outline outline-1 rounded-md p-2 focus:outline-black active:ring-4 active:ring-slate-200"
                    autoComplete="off"
                    onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="outline-slate-200 outline outline-1 rounded-md p-2 focus:outline-black"
                    onChange={(e) => setData("password", e.target.value)}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                )}
                <button
                    type="submit"
                    className="bg-black text-white p-2 rounded-md"
                    disabled={processing}
                >
                    Submit
                </button>
            </form>
        </Auth>
    );
}
