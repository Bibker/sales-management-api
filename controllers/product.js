const { models: { Product } } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = {
    create: async (req, res) => {
        if (req.body.title && req.body.price && req.body.category) {
            const {title, price, description, category, image}=req.body;
            await Product.create({title, price, description, category, image});
            res.status(201);
            res.json({
                status: "success",
                statusMessage: "Product Created Successfully."
            });

        }
        else {
            res.status(400);
            res.json({
                status: "failed",
                statusMessage: "Please Enter All Fields.<br>(title , price, category))"
            });
        }
    },

    search: async (req, res) => {
       
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { title, price, description, category, image } = req.body;
        try {
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({
                    status: "failed",
                    statusMessage: 'Product not found'
                });
            }

            product.title = title;
            product.description = description;
            product.price = price;
            product.category = category;
            product.image = image;
            await product.save();

            res.json({
                status: "success",
                statusMessage: "Product details updated successfully."
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                statusMessage: error
            });
        }

    },
    delete: async (req, res) => {
        const {id}= req.params;
        Product.destroy({
            where: {
                id:id
            }
        });
        res.json({
            status: "success",
            statusMessage: "Product Deleted successfully."
        });

    },
    all: async (req, res) => {
        await Product.findAll()
            .then((products) => {
                if (products.length) {
                    res.json(products)
                }
                else {
                    res.send("<h1>No Products found in database</h1>");
                }
            })
            .catch((error) => {
                console.error('Error occurred while querying the database:', error);
            })

    }
}

const findUser = async (user) => await User.findOne({
    where: user
});