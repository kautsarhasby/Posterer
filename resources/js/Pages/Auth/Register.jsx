import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/react";
import { Newspaper } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Auth } from "../../Layouts/Auth";
import { ErrorMessage } from "../../Components/ErrorMessage";

const Register = () => {
    const { data, setData, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const { errors } = usePage().props;
    const handleSubmit = async (e) => {
        e.preventDefault();
        Inertia.post("/register", data);
    };

    return (
        <Auth link={"/login"} textLink={"Sign In"} title={"Register"}>
            <form
                action=""
                className="grid grid-rows-6 gap-4"
                method="POST"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="outline-slate-200 outline outline-1 rounded-md p-2 focus:outline-black active:ring-4 active:ring-slate-200"
                    autoComplete="off"
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                <input
                    type="email"
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
                <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    className="outline-slate-200 outline outline-1 rounded-md p-2 focus:outline-black"
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />
                <button
                    type="submit"
                    className="bg-black text-white p-2 rounded-md hover:outline hover:outline-black hover:outline-1 hover:bg-white hover:text-black active:bg-slate-200"
                    disabled={processing}
                >
                    Submit
                </button>
            </form>
        </Auth>
    );
};

export default Register;
