"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ViewPage() {
  const [studentInputs, setStudentInputs] = useState([]);
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  useEffect(() => {
    const url = source 
      ? `/api/studentInput?source=${encodeURIComponent(source)}`
      : '/api/studentInput';
      
    fetch(url)
      .then((response) => response.json())
      .then((data) => setStudentInputs(data.studentInputs));
  }, [source]);

  return (
    <div>
      <h1>All feedback</h1>
      <ul>
        {studentInputs.map((input) => (
          <li key={input._id}>
            <p>Activity Name: {input.activityName}</p>
            <p>Feedback: {input.answerQ1}</p>
            <p>Comment: {input.fbtool}</p>
            <p>Date: {input.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ViewPageContainer() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ViewPage />
      </Suspense>
    </div>
  );
}
