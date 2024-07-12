'use client'

import { useState } from "react";

import Image from 'next/image';
import PartyRavens from "@/assets/party-ravens.svg";
import Raven1 from "@/assets/feedback-button-text-1.svg";
import Raven2 from "@/assets/feedback-button-text-2.svg";
import Raven3 from "@/assets/feedback-button-text-3.svg";


export default function FeedBack() {

  const [answerQ1, setAnswerq1] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!answerQ1) {
    //   alert("Answer is required.");
    //   return;
    // }

    try {
      const res = await fetch("/api/studentInput", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ answerQ1 }),
      });

      if (res.ok) {
        router.push("/closeWindow");
      } else {
        throw new Error("Failed to create an answer.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <div>
        <h1>Great job!</h1>
        <h1>You've finished the Unit</h1>
        <div>
          <Image
            priority
            src={PartyRavens}
            alt="Follow us at c4r.io"
          />
        </div>
        <div>
          Feedback
        </div>
        <div>
          Your feedback helps us to iprove this and other units. Please use the
        </div>
        <div>
          tool below to share your thoughts.
        </div>
        <div>
          <Image
            priority
            src={Raven1}
            alt="Follow us at c4r.io"
          />
          <Image
            priority
            src={Raven2}
            alt="Follow us at c4r.io"
          />
          <Image
            priority
            src={Raven3}
            alt="Follow us at c4r.io"
          />
        </div>
      </div>

      <input
        onChange={(e) => setAnswerq1(e.target.value)}
        value={answerQ1}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Your answer."
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        submit
      </button>
    </form>
  );
}