"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import PartyRavens from "@/assets/party-ravens.svg";
import Raven1 from "@/assets/feedback-button-text-1.svg";
import Raven2 from "@/assets/feedback-button-text-2.svg";
import Raven3 from "@/assets/feedback-button-text-3.svg";

import "./feedbackTool.css";

import localFont from "next/font/local";
const myFont = localFont({ src: "../GeneralSans-Semibold.ttf" });

export default function FeedbackTool() {
    const router = useRouter();

    const [answerQ1, setAnswerq1] = useState("");
    const [fbtool, setFBTool] = useState("No Selection");

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const onValueChange = (event) => {
        setFBTool(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!answerQ1 && !fbtool) {
            alert("Selection or Answer is required to Submit.");
            return;
        }

        try {
            const res = await fetch("/api/studentInput", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ answerQ1, fbtool }),
            });

            if (res.ok) {
                // Clear the input fields
                setAnswerq1("");
                setFBTool("");
                console.log("Answer submitted successfully");
                setHasSubmitted(true);
                // router.push("/closeWindow");
            } else {
                console.log("Failed to create an answer.");
                alert(
                    "There was an error submitting your feedback. Please try again."
                );
                throw new Error("Failed to create an answer.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (hasSubmitted) {
        return (
            <div>
                <div className="feedback-container">
                    <h1 className={myFont.className + " feedback-response"}>
                        Thank you for your feedback!
                    </h1>
                    {/* <button onClick={() => router.push("/")}>Leave feedback</button> */}
                </div>
            </div>
        );
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="form-outer-container"
                style={{ backgroundColor: "#FFFFFF" }}
            >
                {/* <div className="section"> */}
                    <div className="section-content">
                    {/* <p className={myFont.className} >Your feedback helps us to improve this and other
                            units. Please use the tool below to share your
                            thoughts.</p> */}
                        <div className="flex-container widget-container">
                            <p className={myFont.className + " widget-header"}>
                                How was your experience?
                            </p>
                            <div className="widget-input">
                                <input
                                    type="radio"
                                    name="fbtoolanswer"
                                    id="fbtoolns"
                                    value={"Not Sure"}
                                    checked={fbtool === "Not Sure"}
                                    onChange={onValueChange}
                                />
                                <label htmlFor="fbtoolns">
                                    <Image
                                        priority
                                        src={Raven1}
                                        alt="Follow us at c4r.io"
                                        layout="responsive"
                                    />
                                </label>

                                <input
                                    type="radio"
                                    name="fbtoolanswer"
                                    id="fbtoolgd"
                                    value={"Good"}
                                    checked={fbtool === "Good"}
                                    onChange={onValueChange}
                                />
                                <label htmlFor="fbtoolgd">
                                    <Image
                                        priority
                                        src={Raven2}
                                        alt="Follow us at c4r.io"
                                        layout="responsive"
                                    />
                                </label>

                                <input
                                    type="radio"
                                    name="fbtoolanswer"
                                    id="fbtoolgr"
                                    value={"Great"}
                                    checked={fbtool === "Great"}
                                    onChange={onValueChange}
                                />
                                <label htmlFor="fbtoolgr">
                                    <Image
                                        priority
                                        src={Raven3}
                                        alt="Follow us at c4r.io"
                                        layout="responsive"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Text input area */}
                        <div>
                            <p className={myFont.className}>
                                Tell us how this Unit could improve:
                            </p>
                        </div>
                        <div className="flex-container2">
                            <textarea
                                onChange={(e) => setAnswerq1(e.target.value)}
                                value={answerQ1}
                                type="text"
                                placeholder="My experience was..."
                                className="widget-text-input"
                            />
                            <br></br>
                            <button type="submit">submit</button>
                        </div>
                    </div>
                {/* </div> */}

                {/* Temporarily hidden until we have confirmation on lower content */}
            </form>
        </div>
    );
}
