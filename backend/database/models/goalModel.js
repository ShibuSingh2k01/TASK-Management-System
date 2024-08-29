import mongoose from "mongoose";

// Schema
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Enter text"],
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
