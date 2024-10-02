import connectMongoDB from "@/libs/mongodb";
import StudentInput from "@/models/studentFeedbackWidget";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { answerQ1, fbtool } = await request.json();
  await connectMongoDB();
  await StudentInput.create({ answerQ1, fbtool, activityName});
  return NextResponse.json({ message: "Feedback Submitted" }, { status: 201 });
}