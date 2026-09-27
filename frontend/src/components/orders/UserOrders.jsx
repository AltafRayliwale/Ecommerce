import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../store/actions";


const UserOrders = () => {
    const dispatch = useDispatch();
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);   
    const orderState = useSelector((state) => state.order);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const userOrders = orderState?.userOrders;

    useEffect(() => {
        dispatch(getUserOrders(""));
    }, [dispatch]);

    const orders = userOrders?.content || [];

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            !search ||
            String(order.orderId)
                .toLowerCase()
                .includes(search.toLowerCase());

        if (filter === "all") return matchesSearch;

        if (filter === "delivered") {
            return (
                order.orderStatus?.toLowerCase() === "delivered" &&
                matchesSearch
            );
        }

        return (
            order.orderStatus?.toLowerCase() !== "delivered" &&
            matchesSearch
        );
    });

    const toggleOrder = (orderId) => {
        setExpandedOrder(
            expandedOrder === orderId ? null : orderId
        );
    };

    const getProductImage = (image) => {
        if (!image) return "/placeholder.png";

        if (image.startsWith("http")) {
            return image;
        }

        return `${import.meta.env.VITE_BACK_END_URL}/images/${image}`;
    };

    const getStatusIndex = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return 1;
            case "packed":
                return 2;
            case "shipped":
                return 3;
            case "delivered":
                return 4;
            default:
                return 0;
        }
    };

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-white px-7 py-6 text-[#142033]">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-7">
                <h1 className="text-4xl font-bold">
                    My Orders
                </h1>

                <div className="relative w-[260px]">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
    ⌕
</span>

                    <input
                        type="text"
                        placeholder="Search orders"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 rounded-xl border border-gray-300 pl-10 pr-4 outline-none focus:border-gray-500"
                    />
                </div>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex gap-4 mb-7">

                <button
                    onClick={() => setFilter("all")}
                    className={`px-7 py-3 rounded-xl border font-medium ${
                        filter === "all"
                            ? "bg-[#142033] text-white border-[#142033]"
                            : "bg-white text-[#142033] border-gray-300"
                    }`}
                >
                    All orders
                </button>

                <button
                    onClick={() => setFilter("progress")}
                    className={`px-7 py-3 rounded-xl border font-medium ${
                        filter === "progress"
                            ? "bg-[#142033] text-white border-[#142033]"
                            : "bg-white text-[#142033] border-gray-300"
                    }`}
                >
                    In progress
                </button>

                <button
                    onClick={() => setFilter("delivered")}
                    className={`px-7 py-3 rounded-xl border font-medium ${
                        filter === "delivered"
                            ? "bg-[#142033] text-white border-[#142033]"
                            : "bg-white text-[#142033] border-gray-300"
                    }`}
                >
                    Delivered
                </button>
            </div>

            {/* ORDERS */}
            <div className="space-y-4">

                {filteredOrders.map((order) => {

                    const isExpanded =
                        expandedOrder === order.orderId;

                    const currentStatus =
                        getStatusIndex(order.orderStatus);

                    return (
                        <div
                            key={order.orderId}
                            className="border border-gray-300 rounded-2xl overflow-hidden bg-white"
                        >

                            {/* ORDER HEADER */}
                            <button
                                type="button"
                                onClick={() => toggleOrder(order.orderId)}
                                className="w-full px-7 py-6 flex items-center text-left hover:bg-gray-50 transition"
                            >

                                <div className="flex-1">

                                    <p className="text-sm text-gray-500 mb-1">
                                        #{String(order.orderId).padStart(4, "0")}
                                    </p>

                                    <h2 className="text-xl font-semibold">
                                        {order.orderItems?.[0]?.product?.productName ||
                                            "Order"}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {formatDate(order.orderDate)} · qty{" "}
                                        {order.orderItems?.reduce(
                                            (total, item) =>
                                                total + (item.quantity || 0),
                                            0
                                        ) || 0}
                                    </p>

                                </div>

                                <div className="flex items-center gap-7">

                                    <p className="text-lg font-bold">
                                        ₹{Number(order.totalAmount || 0).toFixed(2)}
                                    </p>

                                    <span className="px-4 py-2 rounded-full bg-green-50 text-green-600 font-medium">
                                        {order.orderStatus}
                                    </span>

                                    {isExpanded ? (
                                        <span className="text-xl">⌃</span>
                                    ) : (
                                        <span className="text-xl">⌄</span>
                                    )}

                                </div>

                            </button>

                            {/* EXPANDED DETAILS */}
                            {isExpanded && (
                                <div className="border-t border-gray-200">

                                    {/* STATUS TRACKER */}
                                    <div className="px-10 py-8">

                                        <div className="flex items-start">

                                            {[
                                                "Placed",
                                                "Accepted",
                                                "Packed",
                                                "Shipped",
                                                "Delivered",
                                            ].map((status, index) => {

                                                const active =
                                                    index <= currentStatus;

                                                return (
                                                    <React.Fragment key={status}>

                                                        <div className="flex-1 text-center">

                                                            <div
                                                                className={`mx-auto w-4 h-4 rounded-full ${
                                                                    active
                                                                        ? "bg-green-600"
                                                                        : "bg-gray-300"
                                                                }`}
                                                            />

                                                            <p
                                                                className={`mt-3 text-sm ${
                                                                    active
                                                                        ? "text-[#142033] font-medium"
                                                                        : "text-gray-400"
                                                                }`}
                                                            >
                                                                {status}
                                                            </p>

                                                        </div>

                                                        {index < 4 && (
                                                            <div
                                                                className={`mt-2 h-[2px] flex-1 ${
                                                                    index < currentStatus
                                                                        ? "bg-green-600"
                                                                        : "bg-gray-300"
                                                                }`}
                                                            />
                                                        )}

                                                    </React.Fragment>
                                                );
                                            })}

                                        </div>
                                    </div>

                                    {/* ORDER ITEMS */}
                                    <div className="border-t border-gray-200 px-7 py-7">

                                        <h3 className="text-2xl font-semibold mb-5">
                                            Order Items
                                        </h3>

                                        {order.orderItems?.map((item) => (

                                            <div
                                                key={item.orderItemId}
                                                className="flex items-center gap-6"
                                            >

                                                {/* PRODUCT IMAGE */}
                                                <div className="w-[105px] h-[105px] rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex-shrink-0">

                                                    <img
                                                        src={getProductImage(
                                                            item.product?.image
                                                        )}
                                                        alt={
                                                            item.product?.productName ||
                                                            "Product"
                                                        }
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => {
                                                            e.currentTarget.src =
                                                                "/placeholder.png";
                                                        }}
                                                    />

                                                </div>

                                                {/* PRODUCT INFO */}
                                                <div>
                                                    <h4 className="text-lg font-semibold">
                                                        {item.product?.productName}
                                                    </h4>

                                                    <p className="text-lg mt-1">
                                                        ₹
                                                        {Number(
                                                            item.orderedProductPrice || 0
                                                        ).toFixed(2)}
                                                    </p>

                                                    <p className="text-gray-500 mt-1">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                    {/* PAYMENT + TOTAL */}
                                    <div className="border-t border-gray-200 mx-7 px-0 py-7 flex">

                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">
                                                Payment
                                            </p>

                                            <p className="text-lg font-semibold mt-1">
                                                Completed
                                            </p>
                                        </div>

                                        <div className="flex-1 border-l border-gray-200 pl-7">
                                            <p className="text-sm text-gray-500">
                                                Total
                                            </p>

                                            <p className="text-xl font-bold mt-1">
                                                ₹
                                                {Number(
                                                    order.totalAmount || 0
                                                ).toFixed(2)}
                                            </p>
                                        </div>

                                    </div>

                                    {/* DATE + ADDRESS */}
                                    <div className="border-t border-gray-200 mx-7 px-0 py-7 flex">

                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">
                                                Order Date
                                            </p>

                                            <p className="text-lg mt-2">
                                                {formatDate(order.orderDate)}
                                            </p>
                                        </div>

                                       <div className="flex-1 border-l border-gray-200 pl-7">
    <p className="text-sm text-gray-500">
        Shipping Address
    </p>

    <div className="text-lg mt-2">
        <p className="font-medium">
            {order.address?.buildingName || ""}
        </p>

        <p>
            {order.address?.street || ""}
        </p>

        <p>
            {order.address?.city || ""}
            {order.address?.city && order.address?.state ? ", " : ""}
            {order.address?.state || ""}
        </p>

        <p>
            {order.address?.country || ""}
            {order.address?.pincode
                ? ` - ${order.address.pincode}`
                : ""}
        </p>
    </div>
</div>

                                    </div>

                                    {/* VIEW DETAILS BUTTON - BOTTOM RIGHT */}
                                    <div className="border-t border-gray-200 px-7 py-5 flex justify-end">

<button
    type="button"
    onClick={(e) => {
        e.stopPropagation();
        setExpandedOrder(
            expandedOrder === order.orderId
                ? null
                : order.orderId
        );
    }}
    className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
>
    {expandedOrder === order.orderId ? "Hide Details" : "View Details"}
    <span className="text-xl">
        {expandedOrder === order.orderId ? "" : "›"}
    </span>
</button>

                                    </div>

                                </div>
                            )}

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default UserOrders;