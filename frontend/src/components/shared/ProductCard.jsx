import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const [selectedViewProduct, setSelectedViewProduct] = useState("");

    const btnLoader = false;
    const isAvailable = quantity && Number(quantity) > 0;

    const dispatch = useDispatch();

    const productData = {
        id: productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
    };

    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    };

    return (
<div className="
    border
    border-gray-200
    rounded-lg
    shadow-sm
    overflow-hidden
    bg-white
    transition-shadow
    duration-300
    hover:shadow-lg
">

            {/* IMAGE */}
            <div
                onClick={() => handleProductView(productData)}
                className="
                    w-full
                    h-36
                    sm:h-52
                    lg:h-auto
                    lg:aspect-3/2
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                "
            >
                <img
                    src={image}
                    alt={productName}
                    className="
                        w-full
                        h-full
                        object-contain
                        cursor-pointer
                        transition-transform
                        duration-300
                        hover:scale-105
                    "
                />
            </div>

            {/* DETAILS */}
            <div className="
                p-2
                sm:p-4
            ">

                {/* PRODUCT NAME */}
                <h2
                    onClick={() => handleProductView(productData)}
                    className="
                        text-sm
                        sm:text-lg
                        font-semibold
                        text-slate-900
                        leading-tight
                        cursor-pointer
                        line-clamp-2
                        mb-1
                    "
                >
                    {truncateText(productName, 32)}
                </h2>

                {/* DESCRIPTION
                    Hidden on mobile to save space
                */}
                <p className="
                    hidden
                    sm:block
                    text-gray-600
                    text-sm
                    leading-5
                    mb-3
                    line-clamp-2
                ">
                    {truncateText(description, 80)}
                </p>

                {!about && (
                    <div className="
                        flex
                        items-end
                        justify-between
                        gap-1
                    ">

                        {/* PRICE */}
                        <div className="flex flex-col min-w-0">

                            {specialPrice ? (
                                <>
                                    <span className="
                                        text-gray-400
                                        line-through
                                        text-[10px]
                                        sm:text-sm
                                    ">
                                        ₹{Number(price).toFixed(2)}
                                    </span>

                                    <span className="
                                        text-base
                                        sm:text-xl
                                        font-bold
                                        text-slate-800
                                    ">
                                        ₹{Number(specialPrice).toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className="
                                    text-base
                                    sm:text-xl
                                    font-bold
                                    text-slate-800
                                ">
                                    ₹{Number(price).toFixed(2)}
                                </span>
                            )}

                            {/* DISCOUNT */}
                            {discount > 0 && (
                                <span className="
                                    hidden
                                    sm:block
                                    text-green-600
                                    text-xs
                                    font-medium
                                ">
                                    {discount}% off
                                </span>
                            )}
                        </div>

                        {/* ADD TO CART */}
                        <button
                            disabled={!isAvailable || btnLoader}
                            onClick={() =>
                                addToCartHandler({
                                    image,
                                    productName,
                                    description,
                                    specialPrice,
                                    price,
                                    productId,
                                    quantity,
                                })
                            }
                            className={`
                                flex
                                items-center
                                justify-center
                                gap-1
                                shrink-0
                                bg-blue-500
                                ${
                                    isAvailable
                                        ? "opacity-100 hover:bg-blue-600"
                                        : "opacity-70"
                                }
                                text-white
                                rounded-md
                                transition-colors
                                duration-300
                                px-2
                                py-1.5
                                text-[10px]
                                sm:text-sm
                                sm:px-3
                                sm:py-2
                            `}
                        >
                            <FaShoppingCart
                                size={11}
                                className="sm:hidden"
                            />

                            <FaShoppingCart
                                size={14}
                                className="hidden sm:block"
                            />

                            <span>
                                {isAvailable
                                    ? "Add to Cart"
                                    : "Stock Out"}
                            </span>
                        </button>

                    </div>
                )}

            </div>

            {/* PRODUCT VIEW MODAL */}
            <ProductViewModal
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />

        </div>
    );
};

export default ProductCard;