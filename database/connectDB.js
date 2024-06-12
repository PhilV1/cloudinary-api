import mongoose from 'mongoose'

const connecDB = async (URL) => {
  return mongoose.connect(URL)
}

export default connecDB
