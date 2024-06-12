import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

const productModel = mongoose.model('product', ProductSchema)

export default productModel
