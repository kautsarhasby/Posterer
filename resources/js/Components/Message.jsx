import React from "react";
import { Info, TriangleAlert } from "lucide-react";
export const Message = ({ error }) => {
    return (
        <>
            <div
                className={`shadow-md  outline outline-2 ${
                    error
                        ? "outline-red-600  text-red-600"
                        : "outline-green-500  text-green-500"
                } min-w-max mx-5 p-2 rounded-md text-center  font-medium flex items-center gap-2 transition ease-in-out`}
            >
                {error ? (
                    <>
                        <TriangleAlert />
                        <span>Error data</span>
                    </>
                ) : (
                    <>
                        <Info />
                        <span>Success</span>
                    </>
                )}
            </div>
        </>
    );
};
