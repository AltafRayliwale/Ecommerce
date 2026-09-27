import ProductCard from "./shared/ProductCard";
import {
    FaShieldAlt,
    FaTruck,
    FaHeadset,
    FaShoppingBag,
    FaArrowRight,
    FaCheckCircle,
    FaSearch,
    FaCartPlus,
    FaCreditCard,
    FaGift,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";

const About = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts("pageNumber=0&pageSize=3"));
    }, [dispatch]);

    const featuredProducts = products?.slice(0, 3) || [];

    return (
        <div className="w-full min-h-screen bg-white text-slate-800">

            {/* =====================================================
                HERO SECTION
            ====================================================== */}
            <section className="w-full bg-white border-b border-slate-100">

                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14 items-center py-12 sm:py-16 lg:py-20">

                        {/* LEFT CONTENT */}
                        <div className="w-full">

                            <p className="text-blue-600 text-sm font-bold uppercase tracking-[0.18em] mb-5">
                                About Our Store
                            </p>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] text-slate-900">
                                Shopping made
                                <span className="block text-blue-600">
                                    simple.
                                </span>
                            </h1>

                            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-8 max-w-2xl">
                                Discover quality products with a simple,
                                secure and convenient shopping experience.
                                Find what you need and enjoy technology for
                                a better everyday life.
                            </p>

                            {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-8">

                                <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200 shadow-sm"
                                >
                                    Explore Products
                                    <FaArrowRight className="text-sm" />
                                </Link>

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-700 font-semibold transition duration-200"
                                >
                                    Contact Us
                                </Link>

                            </div>

                            {/* TRUST POINTS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-9">

                                <div className="flex items-center gap-2.5">
                                    <FaCheckCircle className="text-blue-600 shrink-0" />
                                    <span className="text-sm text-slate-600">
                                        Quality Products
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <FaCheckCircle className="text-blue-600 shrink-0" />
                                    <span className="text-sm text-slate-600">
                                        Secure Shopping
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <FaCheckCircle className="text-blue-600 shrink-0" />
                                    <span className="text-sm text-slate-600">
                                        Easy Ordering
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <FaCheckCircle className="text-blue-600 shrink-0" />
                                    <span className="text-sm text-slate-600">
                                        Customer Support
                                    </span>
                                </div>

                            </div>

                        </div>


                        {/* RIGHT IMAGE */}
                        <div className="relative w-full">

                            <div className="absolute inset-5 bg-blue-100/50 rounded-[3rem] blur-3xl"></div>

                            <div className="relative bg-slate-50 rounded-3xl border border-slate-200 p-3 sm:p-5 shadow-sm">

                                <img
                                    src="https://images.pexels.com/photos/18311089/pexels-photo-18311089.jpeg"
                                    alt="Modern electronics"
                                    className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-2xl"
                                />

                                <div className="absolute bottom-8 left-8 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <FaShoppingBag className="text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Shopping
                                        </p>

                                        <p className="text-sm font-bold text-slate-900">
                                            Made Simple
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                BENEFITS
            ====================================================== */}
            <section className="w-full bg-white border-b border-slate-100">

                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

                        {/* QUALITY */}
                        <div className="flex items-center gap-4 py-7 lg:px-6 xl:px-10 border-b sm:border-r lg:border-b-0 border-slate-200">

                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                <FaShoppingBag className="text-xl text-blue-600" />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Quality Products
                                </h3>

                                <p className="text-xs text-slate-500 mt-1">
                                    Carefully selected for your needs
                                </p>
                            </div>

                        </div>


                        {/* SECURITY */}
                        <div className="flex items-center gap-4 py-7 lg:px-6 xl:px-10 border-b lg:border-b-0 lg:border-r border-slate-200">

                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                <FaShieldAlt className="text-xl text-blue-600" />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Secure Shopping
                                </h3>

                                <p className="text-xs text-slate-500 mt-1">
                                    Your information is protected
                                </p>
                            </div>

                        </div>


                        {/* ORDERING */}
                        <div className="flex items-center gap-4 py-7 lg:px-6 xl:px-10 border-b sm:border-b-0 sm:border-r border-slate-200">

                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                <FaTruck className="text-xl text-blue-600" />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Easy Ordering
                                </h3>

                                <p className="text-xs text-slate-500 mt-1">
                                    A smooth checkout experience
                                </p>
                            </div>

                        </div>


                        {/* SUPPORT */}
                        <div className="flex items-center gap-4 py-7 lg:px-6 xl:px-10">

                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                <FaHeadset className="text-xl text-blue-600" />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Customer Support
                                </h3>

                                <p className="text-xs text-slate-500 mt-1">
                                    We're here whenever you need help
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                WHY CHOOSE US
            ====================================================== */}
            <section className="w-full bg-slate-50">

                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-16 lg:py-20">

                    <div className="text-center mb-10">

                        <p className="text-blue-600 text-sm font-bold uppercase tracking-[0.18em]">
                            Why Choose Us
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
                            Everything you need for a better
                            <span className="block">
                                shopping experience.
                            </span>
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {/* CARD 1 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-7 text-center hover:-translate-y-1 hover:shadow-lg transition duration-300">

                            <div className="w-14 h-14 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                                <FaShieldAlt className="text-2xl text-blue-600" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mt-5">
                                Secure Shopping
                            </h3>

                            <p className="text-sm text-slate-500 leading-6 mt-3">
                                Protected account and authentication
                                system for a safe shopping experience.
                            </p>

                        </div>


                        {/* CARD 2 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-7 text-center hover:-translate-y-1 hover:shadow-lg transition duration-300">

                            <div className="w-14 h-14 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                                <FaTruck className="text-2xl text-blue-600" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mt-5">
                                Easy Ordering
                            </h3>

                            <p className="text-sm text-slate-500 leading-6 mt-3">
                                Browse products, add to cart and place
                                your order with ease.
                            </p>

                        </div>


                        {/* CARD 3 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-7 text-center hover:-translate-y-1 hover:shadow-lg transition duration-300">

                            <div className="w-14 h-14 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                                <FaHeadset className="text-2xl text-blue-600" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mt-5">
                                Customer Support
                            </h3>

                            <p className="text-sm text-slate-500 leading-6 mt-3">
                                Get help whenever you need it through
                                our contact system.
                            </p>

                        </div>


                        {/* CARD 4 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-7 text-center hover:-translate-y-1 hover:shadow-lg transition duration-300">

                            <div className="w-14 h-14 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                                <FaShoppingBag className="text-2xl text-blue-600" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mt-5">
                                Quality Products
                            </h3>

                            <p className="text-sm text-slate-500 leading-6 mt-3">
                                Explore a growing collection of useful
                                products for everyday needs.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                OUR STORY
            ====================================================== */}
            <section className="w-full bg-white">

                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-16 lg:py-20">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-center">

                        {/* IMAGE */}
                        <div className="w-full">

                            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">

                                <img
                                    src="https://images.pexels.com/photos/8251149/pexels-photo-8251149.jpeg"
                                    alt="Electronics workspace"
                                    className="w-full h-[350px] lg:h-[450px] object-cover hover:scale-105 transition duration-500"
                                />

                            </div>

                        </div>


                        {/* CONTENT */}
                        <div className="w-full">

                            <p className="text-blue-600 text-sm font-bold uppercase tracking-[0.18em]">
                                Our Story
                            </p>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 leading-tight">
                                Built around a better
                                <span className="block">
                                    shopping experience.
                                </span>
                            </h2>

                            <p className="text-slate-600 leading-7 mt-6">
                                We started with a simple goal — to make
                                online shopping simple, convenient and
                                enjoyable.
                            </p>

                            <p className="text-slate-600 leading-7 mt-4">
                                Our focus is on providing quality products,
                                a smooth shopping experience and reliable
                                customer support.
                            </p>

                            <div className="mt-7 space-y-4">

                                <div className="flex items-start gap-3">

                                    <FaCheckCircle className="text-blue-600 mt-1 shrink-0" />

                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Simple experience
                                        </h4>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Easy navigation and product
                                            discovery.
                                        </p>
                                    </div>

                                </div>


                                <div className="flex items-start gap-3">

                                    <FaCheckCircle className="text-blue-600 mt-1 shrink-0" />

                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Secure platform
                                        </h4>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Protected account and shopping
                                            features.
                                        </p>
                                    </div>

                                </div>


                                <div className="flex items-start gap-3">

                                    <FaCheckCircle className="text-blue-600 mt-1 shrink-0" />

                                    <div>
                                        <h4 className="font-semibold text-slate-900">
                                            Customer focused
                                        </h4>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Dedicated support for your
                                            questions and concerns.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                EXPLORE PRODUCTS
            ====================================================== */}
            <section className="w-full bg-slate-50 border-y border-slate-100">

                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-16 lg:py-20">

                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">

                        <div>

                            <p className="text-blue-600 text-sm font-bold uppercase tracking-[0.18em]">
                                Our Collection
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
                                Explore our products
                            </h2>

                            <p className="text-slate-500 mt-3">
                                Discover some of the latest products
                                available in our store.
                            </p>

                        </div>


                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-semibold transition duration-200"
                        >
                            View All Products
                            <FaArrowRight className="text-xs" />
                        </Link>

                    </div>


                    {/* REAL DATABASE PRODUCTS */}
                    {featuredProducts.length > 0 ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {featuredProducts.map((product) => (

                                <ProductCard
                                    key={product.productId}
                                    {...product}
                                    about
                                />

                            ))}

                        </div>

                    ) : (

                        <div className="bg-white border border-slate-200 rounded-2xl py-16 text-center">

                            <FaShoppingBag className="mx-auto text-5xl text-slate-300" />

                            <h3 className="text-xl font-bold text-slate-800 mt-5">
                                No products available
                            </h3>

                            <p className="text-slate-500 mt-2">
                                Products will appear here when they are
                                added to the store.
                            </p>

                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                            >
                                Browse Products
                                <FaArrowRight />
                            </Link>

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================================
                HOW IT WORKS
            ====================================================== */}
            <section className="w-full bg-white">

                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-16 lg:py-20">

                    <div className="text-center mb-12">

                        <p className="text-blue-600 text-sm font-bold uppercase tracking-[0.18em]">
                            How It Works
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
                            A simple shopping journey
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* STEP 1 */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                01
                            </div>

                            <div className="w-12 h-12 mx-auto mt-5 rounded-xl bg-blue-50 flex items-center justify-center">
                                <FaSearch className="text-xl text-blue-600" />
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg mt-4">
                                Discover
                            </h3>

                            <p className="text-sm text-slate-500 leading-6 mt-2">
                                Browse our products and find what
                                you need.
                            </p>

                        </div>


                        {/* STEP 2 */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                02
                            </div>

                            <div className="w-12 h-12 mx-auto mt-5 rounded-xl bg-blue-50 flex items-center justify-center">
                                <FaCartPlus className="text-xl text-blue-600" />
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg mt-4">
                                Add to Cart
                            </h3>

                            <p className="text-sm text-slate-500 leading-6 mt-2">
                                Select your products and add them
                                to your cart.
                            </p>

                        </div>


                        {/* STEP 3 */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                03
                            </div>

                            <div className="w-12 h-12 mx-auto mt-5 rounded-xl bg-blue-50 flex items-center justify-center">
                                <FaCreditCard className="text-xl text-blue-600" />
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg mt-4">
                                Checkout
                            </h3>

                            <p className="text-sm text-slate-500 leading-6 mt-2">
                                Complete your order with a secure
                                payment.
                            </p>

                        </div>


                        {/* STEP 4 */}
                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                04
                            </div>

                            <div className="w-12 h-12 mx-auto mt-5 rounded-xl bg-blue-50 flex items-center justify-center">
                                <FaGift className="text-xl text-blue-600" />
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg mt-4">
                                Enjoy Shopping
                            </h3>

                            <p className="text-sm text-slate-500 leading-6 mt-2">
                                Get your products and enjoy your
                                purchase.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FINAL CTA
            ====================================================== */}
            <section className="w-full bg-white">

                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-14 lg:pb-20">

                    <div className="relative overflow-hidden rounded-2xl bg-blue-600 px-6 sm:px-10 lg:px-14 py-12">

                        <div className="absolute -right-20 -bottom-32 w-80 h-80 rounded-full bg-white/10"></div>

                        <div className="absolute right-20 -bottom-40 w-64 h-64 rounded-full bg-white/5"></div>

                        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                            <div>

                                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                    Find something you love.
                                </h2>

                                <p className="text-blue-100 mt-3">
                                    Explore our collection and start
                                    shopping today.
                                </p>

                            </div>


                            <Link
                                to="/products"
                                className="shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-bold transition duration-200"
                            >
                                Shop Now
                                <FaArrowRight />
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
};

export default About;