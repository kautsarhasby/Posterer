import { FaDiscord, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-slate-900  text-white  mt-auto w-full divide-y-[1px] p-2 ">
            <div className="grid grid-cols-2 h-32 divide-x-[1px] py-2">
                <aside className=" h-full flex flex-col items-center justify-center ">
                    <span className="text-2xl font-semibold">Posterer</span>
                    <p className="italic">Posted what you thinking.</p>
                </aside>
                <aside className=" h-full grid grid-rows-2 ">
                    <div className="text-center grid grid-rosw-2">
                        <span className="text-blue-500 font-semibold">
                            Contact Us
                        </span>
                        <span>postererofficial@gmmail.com</span>
                    </div>
                    <div className="flex flex-col items-center justify-center ">
                        <span className="text-blue-500 font-semibold">
                            Our Social Media
                        </span>
                        <div className="flex gap-2 ">
                            <FaXTwitter size={20} />
                            <FaInstagram size={20} />
                            <FaDiscord size={20} />
                        </div>
                    </div>
                </aside>
            </div>
            <div className="flex justify-center items-center p-2">
                <span>&copy;2024 Posterer. All rights reserved</span>
            </div>
        </footer>
    );
}
