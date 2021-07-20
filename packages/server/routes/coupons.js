import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types

const couponsSchema = new mongoose.Schema({
  code: {
    type: String,
    requried: true,
  },
  discount: {
    type: String,
    required: true,
  }
})

const Coupon = mongoose.model('Coupon', couponsSchema)

export default Coupon