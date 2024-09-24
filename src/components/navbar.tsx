import React from "react";
import Link from "next/link";
import Button from "./button";

const Navbar = () => {
    return (
        <>
            <div className="w-full h-20 bg-pewterBlue sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <ul className="hidden md:flex gap-x-6 text-foreground">
                            <li>
                                <Link href="/plans">
                                    <p>Plans</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/routines">
                                    <p>Routines</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    <p>About Me</p>
                                </Link>
                            </li>
                        </ul>
                        <Button />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;