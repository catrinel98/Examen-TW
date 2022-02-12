import mongoose from "mongoose";

const ReferenceSchema = new mongoose.Schema({
  id: {
    type: Number,
    primaryKey: true,
    required: true,
    unique: true,
    trim: true,
  },
  articleID: {
    type: Number,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
    required: "Title is required",
    minLength: [5, "Title must be at least 5 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  authors: {
    type: String,
    trim: true,
    required: "At least 1 author is required",
  },
});

export default mongoose.model("References", ReferenceSchema);
