const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product.js')

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        const product = await Product.findById(id);

        // // If the product with the given ID is not found
        // if (!product) {
        //     return res.status(404).json({ message: 'Product not found' });
        // }

        res.json(product)
    } catch (error) {
        next(error);
    }
})


router.post('/', async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (err) {
        next(err);
    }
});
// Update Product information
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,          // Return the updated product
            runValidators: true // Ensure the update respects the schema validation
        });

        // If the product with the given ID is not found
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        next(error)
    }
})

// DELETE PRODUCT BY ID
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const validateId = mongoose.Types.ObjectId.isValid(id);

        if(!validateId){
            return res.status(404).json({message: 'Invalid product ID format'});
        }

        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message:'Product ID not found'});
        }

        res.json({message:'Delete Product ID successfully'})

    } catch (error) {
        next(error)
    }
})

module.exports = router;