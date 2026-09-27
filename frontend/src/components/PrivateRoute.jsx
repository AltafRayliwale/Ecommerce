import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth);

    console.log("Redux user:", user);
    console.log("Is Admin:", user?.roles?.includes("ROLE_ADMIN"));

    const isAdmin = user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user?.roles?.includes("ROLE_SELLER");
    const location = useLocation();

    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />;
    }

    if (adminOnly) {
        if (isSeller && !isAdmin) {
            const sellerAllowedPaths = [
                "/admin/orders",
                "/admin/products"
            ];

            const sellerAllowed = sellerAllowedPaths.some(path =>
                location.pathname.startsWith(path)
            );

            if (!sellerAllowed) {
                return <Navigate to="/" replace />;
            }
        }
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;