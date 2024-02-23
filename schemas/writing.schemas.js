import mongoose from "mongoose";

const WriteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
    

})

export default mongoose.model("Write",WriteSchema)