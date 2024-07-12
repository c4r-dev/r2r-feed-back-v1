import mongoose, { Schema } from "mongoose";

const studentinputSchema = new Schema(
  {
    answerQ1: String,
  },

  {
    timestamps: true,
  }
);

const StudentInput = mongoose.models.StudentInput || mongoose.model("StudentInput", studentinputSchema);

export default StudentInput;
