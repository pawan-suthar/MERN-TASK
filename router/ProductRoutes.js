const express = require('express')
const { create, read, readp, deletep, updatep } = require('../controller/ProductController')
const router = express.Router()

router.post("/create", create) // create //
router.put("/update/:id", updatep) //update
router.get("/products", read) //readall //
router.get("/product/:id", readp) //read particular //
router.delete("/delete/:id", deletep) //delete //


module.exports = router;