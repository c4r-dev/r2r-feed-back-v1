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
        <h1>Suplementary Materials</h1>
      </div>
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
          Your feedback helps us to improve this and other units. Please use the
        </div>
        <div>
          tool below to share your thoughts.
        </div>
        <div class="flex-container">
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
      <button type="submit">
        submit
      </button>
      <div><br></br></div>
      <div>
        Tool Repository
      </div>
      <div>
        <p>
          We've collected a list of all sorts of rigor & reproducitibilty related tools
          along with links to relevant landing pages, notes as to whether a given
          tool is free and open source, and the specific part of the research
          process for which they might prove most useful. We even provide you
          with quick 10 minutes exercises designed to give you an idea of how you
          make appropriate use of each tool! Check them out and spread the word,
          or submit tools we missed!
        </p>
      </div>
      <div>
        Community Index
      </div>
      <div>
        <p>
          This is an index of various communities that serve to highlight tools,
          disseminate news, facilitate connection and guidance, and nurture the
          next generation of rigor champions - so be sure to join the discussion and
          do your part for rigor!
        </p>
      </div>
      <div>
        Champions Directory
      </div>
      <div>
        <p>
          In order to ensure that the rigor community remains connected, self
          identifying rigor champions are welcome to register with us to be listed in
          this directory and indicate their career stage, area of expertise, and openness
          to contract.
        </p>
      </div>
    </form>
  );
}