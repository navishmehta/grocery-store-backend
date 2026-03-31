const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nameEn: { type: String, required: true, trim: true },
    namePa: { type: String, required: true, trim: true },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    qtyValue: { type: Number, required: true },
    qtyUnit: {
        type: String,
        enum: ['kg', 'g', 'ml', 'l', 'pcs', 'packet'],
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    hasDiscount: {
        type: Boolean,
        default: false
    },
    discountPrice: {
        type: Number,
        validate: {
            validator: function (val) {
                if (this.hasDiscount) {
                    return val != null && val < this.price;
                }
                return true;
            },
            message: "Discount price must be less than original price"
        }
    },
    isOutOfStock: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1506617424156-76ba6e9c93a2?q=80&w=800&auto=format&fit=crop"
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);