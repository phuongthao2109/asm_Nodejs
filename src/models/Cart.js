import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        orderProducts: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: Number,
                totalPrice: Number,
            },
        ],  
        cartTotal: Number,  
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);