import { LoaderCircle } from "lucide-react";

export const LoadingSpinner = () => {
    return (
        <div className="  shadow-lg  min-w-max mx-5 p-2 rounded-md text-center font-medium flex items-center gap-2 transition ease-in-out">
            <LoaderCircle className="animate-spin" />
            <span>Processing</span>
        </div>
    );
};
