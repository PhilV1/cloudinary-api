import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  imgpub: String,
})

const productModel = mongoose.model('product', ProductSchema)

export default productModel
