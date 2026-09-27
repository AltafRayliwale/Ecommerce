import { Badge } from "@mui/material";
import { useState } from "react";
import {
    FaShoppingCart,
    FaSignInAlt,
    FaStore,
} from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);

    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);

    const closeMenu = () => {
        setNavbarOpen(false);
    };

const navLinkClass = (route) =>
    `block py-1.5 sm:py-0 transition-all duration-200 ${
        path === route
            ? "text-white font-semibold"
            : "text-gray-200"
    }`;

    return (
        <nav className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0 shadow-md">
            <div className="w-full px-4 sm:px-8 lg:px-14 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center text-xl sm:text-2xl font-bold shrink-0"
                >
                    <FaStore className="mr-2 text-2xl sm:text-3xl" />
                    <span className="font-[Poppins]">
                        E-Shop
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden sm:flex items-center gap-5 md:gap-7 lg:gap-10">

                    <li className="font-medium">
                        <Link
                            className={navLinkClass("/")}
                            to="/"
                        >
                            Home
                        </Link>
                    </li>

                    <li className="font-medium">
                        <Link
                            className={navLinkClass("/products")}
                            to="/products"
                        >
                            Products
                        </Link>
                    </li>

                    <li className="font-medium">
                        <Link
                            className={navLinkClass("/about")}
                            to="/about"
                        >
                            About
                        </Link>
                    </li>

                    <li className="font-medium">
                        <Link
                            className={navLinkClass("/contact")}
                            to="/contact"
                        >
                            Contact
                        </Link>
                    </li>

                    {/* Cart */}
                    <li>
                        <Link to="/cart">
                            <Badge
                                showZero
                                badgeContent={cart?.length || 0}
                                color="primary"
                                overlap="circular"
                            >
                                <FaShoppingCart size={23} />
                            </Badge>
                        </Link>
                    </li>

                    {/* Login / User */}
                    {user?.id ? (
                        <li>
                            <UserMenu />
                        </li>
                    ) : (
                        <li>
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2
                                bg-linear-to-r from-purple-600 to-red-500
                                text-white font-semibold rounded-md
                                shadow-lg hover:from-purple-500
                                hover:to-red-400 transition duration-300"
                            >
                                <FaSignInAlt />
                                <span>Login</span>
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Right Side */}
                <div className="sm:hidden flex items-center gap-4">

                    {/* Mobile Cart */}
                    <Link to="/cart">
                        <Badge
                            showZero
                            badgeContent={cart?.length || 0}
                            color="primary"
                            overlap="circular"
                        >
                            <FaShoppingCart size={22} />
                        </Badge>
                    </Link>

                    {/* Hamburger */}
                    <button
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="flex items-center justify-center"
                        aria-label="Toggle navigation menu"
                    >
                        {navbarOpen ? (
                            <RxCross2 className="text-white text-3xl" />
                        ) : (
                            <IoIosMenu className="text-white text-3xl" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`sm:hidden absolute top-[70px] left-0 w-full
                bg-custom-gradient shadow-lg border-t border-white/10
                transition-all duration-300 ease-in-out
                ${
                    navbarOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
            >
<ul className="px-4 py-3 space-y-0.5">
                    <li>
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className={navLinkClass("/")}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/products"
                            onClick={closeMenu}
                            className={navLinkClass("/products")}
                        >
                            Products
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/about"
                            onClick={closeMenu}
                            className={navLinkClass("/about")}
                        >
                            About
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/contact"
                            onClick={closeMenu}
                            className={navLinkClass("/contact")}
                        >
                            Contact
                        </Link>
                    </li>

                    {/* Mobile Login / User */}
                    <li className="pt-3 border-t border-white/20">
                        {user?.id ? (
                            <div onClick={closeMenu}>
                                <UserMenu />
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="flex items-center justify-center gap-2
                                w-full px-4 py-2.5
                                bg-linear-to-r from-purple-600 to-red-500
                                text-white font-semibold rounded-md"
                            >
                                <FaSignInAlt />
                                <span>Login</span>
                            </Link>
                        )}
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;