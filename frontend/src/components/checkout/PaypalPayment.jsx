import React, { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import toast from "react-hot-toast";

const PaypalPayment = () => {
    const dispatch = useDispatch();

    const { totalPrice } = useSelector((state) => state.carts);
    const { selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    );

    const [paypalOrderId, setPaypalOrderId] = useState(null);
    const [loading, setLoading] = useState(false);

    const createPayPalOrder = async () => {
        try {
            setLoading(true);

           const { data } = await api.post("/order/paypal/create", {
    amount: Number(totalPrice),
});

console.log("PayPal order response:", data);

setPaypalOrderId(data.id);

return data.id;

        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to create PayPal order"
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

const onApprove = async (data) => {
    try {
        setLoading(true);

        // 1. Capture payment in PayPal
        const captureResponse = await api.post(
            `/order/paypal/capture/${data.orderID}`
        );

        console.log("PayPal capture response:", captureResponse.data);

        // 2. Create order in our e-commerce backend
        const orderRequest = {
            addressId: selectedUserCheckoutAddress.addressId,
            pgName: "PayPal",
            pgPaymentId: data.orderID,
            pgStatus: "COMPLETED",
pgResponseMessage: "PayPal payment captured successfully"        };

        const orderResponse = await api.post(
            "/order/users/payments/Paypal",
            orderRequest
        );

        console.log("E-commerce order created:", orderResponse.data);

        toast.success("Payment successful! Order placed.");

        // 3. Go to order confirmation page
        window.location.href = "/order-confirm";

    } catch (error) {
        console.error("PayPal payment/order error:", error);

        toast.error(
            error?.response?.data?.message ||
            "Payment succeeded but order creation failed"
        );

    } finally {
        setLoading(false);
    }
};

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">

            <h2 className="text-xl font-semibold mb-5 text-center">
                Pay with PayPal
            </h2>

            <PayPalScriptProvider
                options={{
                    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "USD",
                    intent: "capture",
                }}
            >
                <PayPalButtons
                    style={{
                        layout: "vertical",
                        shape: "rect",
                        label: "paypal",
                    }}
                    createOrder={async () => {
                        const orderId = await createPayPalOrder();
                        return orderId;
                    }}
                    onApprove={onApprove}
                    onError={(error) => {
                        console.error("PayPal error:", error);

                        toast.error(
                            "PayPal payment could not be completed."
                        );
                    }}
                    disabled={loading}
                />
            </PayPalScriptProvider>

        </div>
    );
};

export default PaypalPayment;