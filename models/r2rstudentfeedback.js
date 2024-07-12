import mongoose, { Schema } from "mongoose";

const r2rstudentfeedbackSchema = new Schema(
  {
    answerQ1: String,
  },

  {
    timestamps: true,
  }
);

const R2RStudentFeedback = mongoose.models.R2RStudentFeedback || mongoose.model("R2RStudentFeedback", r2rstudentfeedbackSchema);

export default R2RStudentFeedback;
