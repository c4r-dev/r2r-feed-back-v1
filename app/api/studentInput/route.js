import connectMongoDB from "@/libs/mongodb";
import StudentInput from "@/models/studentFeedbackWidget";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { answerQ1, fbtool, activityName } = await request.json();
  await connectMongoDB();
  await StudentInput.create({ answerQ1, fbtool, activityName });
  return NextResponse.json({ message: "Feedback Submitted" }, { status: 201 });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source');
  
  await connectMongoDB();
  
  const query = source ? { activityName: source } : {};
  const studentInputs = await StudentInput.find(query);
  
  return NextResponse.json({ studentInputs });
}
