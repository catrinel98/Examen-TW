import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  id: {
    type: Number,
    primaryKey: true,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
    required: "Title is required",
    minLength: [5, "Title must be at least 5 characters long"],
  },
  conclusion: {
    type: String,
    trim: true,
    required: "Conclusion is required",
    minLength: [10, "Conclusion must be at least 10 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Articles", ArticleSchema);
