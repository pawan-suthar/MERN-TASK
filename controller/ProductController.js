const ProductModel = require("../models/ProductModel");
const mongoose = require("mongoose");

const create = async (req, res) => {
    const { name, desc, price, category } = req.body;
    try {
        const exist = await ProductModel.findOne({ name });

        if (exist) {
            return res.status(400).json({ msg: "Product already exists" });
        }

        const newp = new ProductModel({
            name,
            desc,
            price,
            category,
        });

        const newProduct = await newp.save();
        res.status(201).json({ msg: "Product created", data: newProduct });
    } catch (error) {
        res
            .status(500)
            .json({ msg: "Internal server error", error: error.message });
    }
};

const read = async (req, res) => {
    const query = {};

    if (req.query.price) {
        query.price = req.query.price;
    }

    if (req.query.category) {
        query.category = req.query.category;
    }
    try {
        const allproducts = await ProductModel.find(query);
        if (allproducts.length === 0) {
            return res
                .status(404)
                .json({ msg: "No products found for the given query" });
        }
        res.status(200).json({ data: allproducts });
    } catch (error) {
        res.status(404).json({ msg: error });
    }
};

const readp = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid id ." });
    }
    try {
        const p = await ProductModel.findById(id);
        if (!p) {
            return res.status(404).json({ msg: "Product not found." });
        }
        res.json({ data: p });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." });
    }
};

const deletep = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid id to delete" });
    }

    try {
        const dproduct = await ProductModel.findByIdAndDelete(id);
        res.json({ data: dproduct });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};

const updatep = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid id to update" });
    }

    try {
        const stu = await ProductModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                desc: req.body.desc,
                price: req.body.price,
                category: req.body.category,
            },
            { new: true }
        );
        res.json({ data: stu });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
module.exports = {
    create,
    read,
    readp,
    deletep,
    updatep,
};
