import { useEffect, useMemo, useState } from "react";
import {
    HiOutlineMail,
    HiOutlineSearch,
    HiOutlineTrash,
    HiOutlineClock,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from "react-icons/hi";
import { FiMessageCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../../api/api";

const Contacts = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const messagesPerPage = 5;

    const fetchMessages = async () => {
        try {
            const { data } = await api.get("/admin/contacts");

            console.log("CONTACT MESSAGES:", data);

            setMessages(data);
        } catch (error) {
            console.error("CONTACT ERROR:", error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to fetch contact messages"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (contactId) => {
        try {
            await api.delete(`/admin/contacts/${contactId}`);

            setMessages((prev) =>
                prev.filter(
                    (message) => message.contactId !== contactId
                )
            );

            toast.success("Message deleted successfully");
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete message"
            );
        }
    };

    // Search
    const filteredMessages = useMemo(() => {
        return messages.filter((message) => {
            const searchText = search.toLowerCase();

            return (
                message.name?.toLowerCase().includes(searchText) ||
                message.email?.toLowerCase().includes(searchText) ||
                message.message?.toLowerCase().includes(searchText)
            );
        });
    }, [messages, search]);

    // Pagination
    const totalPages = Math.ceil(
        filteredMessages.length / messagesPerPage
    );

    const startIndex = (currentPage - 1) * messagesPerPage;

    const currentMessages = filteredMessages.slice(
        startIndex,
        startIndex + messagesPerPage
    );

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // Loading
    if (loading) {
        return (
            <div className="min-h-full bg-slate-50 p-6 lg:p-8">

                <div className="animate-pulse">

                    <div className="h-10 w-72 bg-gray-200 rounded mb-3" />
                    <div className="h-5 w-96 bg-gray-200 rounded mb-8" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-28 bg-white rounded-xl border"
                            />
                        ))}

                    </div>

                    <div className="h-96 bg-white rounded-xl border" />

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-8">

            {/* ================= HEADER ================= */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

                <div className="flex items-center gap-4">

                    {/* Icon */}
                    <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                        <HiOutlineMail className="text-4xl text-blue-600" />

                    </div>

                    <div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Contact Messages
                        </h1>

                        <p className="text-sm sm:text-base text-slate-500 mt-1">
                            View and manage messages from your website's contact form.
                        </p>

                    </div>

                </div>

                {/* Breadcrumb */}
                <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500 mt-4 lg:mt-0">

                    <span>Dashboard</span>

                    <HiOutlineChevronRight />

                    <span className="text-slate-700 font-medium">
                        Contact Messages
                    </span>

                </div>

            </div>


            {/* ================= STATISTICS ================= */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

                {/* Total Messages */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center">

                            <HiOutlineMail className="text-3xl text-blue-600" />

                        </div>

                        <div>

                            <p className="text-2xl font-bold text-slate-900">
                                {messages.length}
                            </p>

                            <p className="text-sm text-slate-500">
                                Total Messages
                            </p>

                        </div>

                    </div>

                </div>


                {/* Unread */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center">

                            <FiMessageCircle className="text-3xl text-green-600" />

                        </div>

                        <div>

                            <p className="text-2xl font-bold text-slate-900">
                                {messages.length}
                            </p>

                            <p className="text-sm text-slate-500">
                                Unread Messages
                            </p>

                        </div>

                    </div>

                </div>


                {/* Latest */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center">

                            <HiOutlineClock className="text-3xl text-blue-600" />

                        </div>

                        <div>

                            <p className="text-2xl font-bold text-slate-900">
                                {messages.length > 0 ? "Today" : "—"}
                            </p>

                            <p className="text-sm text-slate-500">
                                Latest Message
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= MESSAGES CONTAINER ================= */}

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

                {/* Messages Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <h2 className="text-xl font-bold text-slate-900">
                            Messages
                        </h2>

                        {/* Search */}
                        <div className="relative w-full md:w-80">

                            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search by name, email or message..."
                                className="w-full border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />

                        </div>

                    </div>

                </div>


                {/* ================= MESSAGE LIST ================= */}

                <div className="p-5 sm:p-6">

                    {currentMessages.length === 0 ? (

                        <div className="py-20 text-center">

                            <HiOutlineMail className="mx-auto text-6xl text-slate-300" />

                            <h3 className="mt-5 text-xl font-bold text-slate-800">
                                No messages found
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                {search
                                    ? "Try a different search."
                                    : "Contact form messages will appear here."
                                }
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {currentMessages.map((message) => (

                                <div
                                    key={message.contactId}
                                    className="border border-slate-200 rounded-xl p-5 sm:p-6 hover:shadow-md transition-shadow duration-200"
                                >

                                    {/* Top */}
                                    <div className="flex items-start justify-between gap-4">

                                        {/* User Info */}
                                        <div className="flex items-center gap-4 min-w-0">

                                            {/* Avatar */}
                                            <div className="h-16 w-16 shrink-0 rounded-full bg-blue-100 flex items-center justify-center">

                                                <span className="text-xl font-bold text-blue-600">
                                                    {message.name
                                                        ?.split(" ")
                                                        .map((word) => word[0])
                                                        .slice(0, 2)
                                                        .join("")
                                                        .toUpperCase()
                                                    }
                                                </span>

                                            </div>


                                            <div className="min-w-0">

                                                <h3 className="text-lg font-bold text-slate-900 truncate">
                                                    {message.name}
                                                </h3>

                                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">

                                                    <HiOutlineMail />

                                                    <span className="truncate">
                                                        {message.email}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>


                                        {/* Right */}
                                        <div className="flex items-center gap-4 shrink-0">

                                            {/* New */}
                                            <span className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold">
                                                New
                                            </span>

                                            <div className="h-10 w-px bg-slate-200 hidden sm:block" />

                                            {/* Delete */}
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        message.contactId
                                                    )
                                                }
                                                className="h-10 w-10 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                                                title="Delete message"
                                            >

                                                <HiOutlineTrash className="text-xl" />

                                            </button>

                                        </div>

                                    </div>


                                    {/* Message */}
                                    <div className="mt-6 bg-slate-50 rounded-lg px-5 py-4">

                                        <div className="flex items-start gap-3">

                                            <span className="text-3xl font-bold text-slate-400 leading-none">
                                                "
                                            </span>

                                            <p className="text-sm sm:text-base text-slate-600 leading-7">
                                                {message.message}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}


                    {/* ================= PAGINATION ================= */}

                    {filteredMessages.length > 0 && (

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-7">

                            <p className="text-sm text-slate-500">

                                Showing{" "}

                                <span className="font-semibold text-slate-700">
                                    {startIndex + 1}
                                </span>

                                {" "}to{" "}

                                <span className="font-semibold text-slate-700">
                                    {Math.min(
                                        startIndex + messagesPerPage,
                                        filteredMessages.length
                                    )}
                                </span>

                                {" "}of{" "}

                                <span className="font-semibold text-slate-700">
                                    {filteredMessages.length}
                                </span>

                                {" "}messages

                            </p>


                            <div className="flex items-center gap-2">

                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) => page - 1)
                                    }
                                    className="h-10 w-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <HiOutlineChevronLeft className="text-xl" />
                                </button>


                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                ).map((page) => (

                                    <button
                                        key={page}
                                        onClick={() =>
                                            setCurrentPage(page)
                                        }
                                        className={`h-10 w-10 rounded-lg font-semibold transition ${
                                            currentPage === page
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                    >
                                        {page}
                                    </button>

                                ))}


                                <button
                                    disabled={
                                        currentPage === totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage((page) => page + 1)
                                    }
                                    className="h-10 w-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <HiOutlineChevronRight className="text-xl" />
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>


            {/* ================= EMPTY STATE PANEL ================= */}

            {messages.length > 0 && (

                <div className="mt-6 bg-white border border-slate-200 rounded-xl shadow-sm py-16 sm:py-20 text-center">

                    <HiOutlineMail className="mx-auto text-6xl text-slate-400" />

                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                        No more messages
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Contact form messages will appear here.
                    </p>

                </div>

            )}

        </div>
    );
};

export default Contacts;