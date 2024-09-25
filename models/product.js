const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    prod_name: {
        type: String,
        required: true, // Ensures the product name is required
    },
    prod_desc: {
        type: String,
        required: true, // Ensures product description is required
    },
    prod_price: {
        type: Number,
    }
}, {
    timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
});


module.exports = mongoose.model('Product', ProductSchema)