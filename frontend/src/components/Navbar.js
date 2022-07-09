import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="mb-6">
            <header>
                <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 shadow-sm">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <span className="self-center text-xl font-semibold">
                            <a href="/"> Celebrities</a>
                        </span>
                        <ul className="flex flex-row space-x-2 mt-0 md:text-sm font-medium items-center">
                            <li>
                                <NavLink
                                    to="/"
                                    className={(nav) =>
                                        nav.isActive
                                            ? "block py-2 pr-4 pl-3 bg-green-400 rounded bg-transparent text-green-400 p-0 "
                                            : "block py-2 pr-4 pl-3 text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/create"
                                    className={(nav) =>
                                        nav.isActive
                                            ? "block py-2 pr-4 pl-3 bg-green-400 rounded bg-transparent text-green-400 p-0"
                                            : "block py-2 pr-4 pl-3 text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-400 md:p-0"
                                    }
                                >
                                    Create
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
