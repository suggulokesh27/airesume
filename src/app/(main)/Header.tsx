"use client";

import ToggleTheme from "@/components/ToggleTheme";
// import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="shadow-lg bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="flex items-center justify-between p-4">
                <Link
                    href="/"
                    className="text-3xl font-bold text-cyan-500 hover:text-cyan-600"
                >
                    Ai ReZumes BuilderZ
                </Link>

                <div className="flex items-center space-x-4">
                    <ToggleTheme />
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: {
                                    width: "35px",
                                    height: "35px",
                                },
                            },
                        }}
                    >

                    <UserButton.MenuItems>
                        <UserButton.Link
                            label="Billing"
                            labelIcon={<CreditCard className="size-4" />}
                            href="/billing"
                        />
                    </UserButton.MenuItems>
                </UserButton>
            </div>
        </div>
        </header >
    );
};

export default Header;
