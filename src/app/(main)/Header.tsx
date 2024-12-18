"use client";

import ToggleTheme from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { UserCircle2 } from "lucide-react";
import Link from "next/link";

const Header = () => {

    return (
        <header className="shadow-lg bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="flex items-center justify-between p-4">
                <div>
                    <Link
                        href="/"
                        className="text-3xl font-bold text-cyan-500 hover:text-cyan-600"
                    >
                        Ai ReZumes BuilderZ
                    </Link>
                </div>
                <Button asChild>
                <ToggleTheme />
                </Button>

                {/* <div className="flex items-center gap-3">
                    <div className="relative text-3xl text-blue-600 cursor-pointer group">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <UserCircle2 className="hover:text-cyan-500 transition-colors duration-200" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="mt-2 mr-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[150px] transition-colors duration-200"
                            >
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/login"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                                    >
                                        Login
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        href="/register"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                                    >
                                        Register
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div> */}
            </div>
        </header>
    );
};

export default Header;
