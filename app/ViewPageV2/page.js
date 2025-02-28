"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function ViewPage() {
  const [studentInputs, setStudentInputs] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const source = searchParams.get('source');

  useEffect(() => {
    const url = source 
      ? `/api/studentInput?source=${encodeURIComponent(source)}`
      : '/api/studentInput';
      
    fetch(url)
      .then((response) => response.json())
      .then((data) => setStudentInputs(data.studentInputs));
  }, [source]);

  const handleFilterApply = (e) => {
    e.preventDefault();
    if (filterInput.trim()) {
      router.push(`/ViewPageV2?source=${encodeURIComponent(filterInput.trim())}`);
    } else {
      router.push('/ViewPageV2');
    }
  };

  return (
    <div>
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Current Filter:</h2>
        <p>{source ? `Showing results for: ${source}` : 'No filter applied - showing all results'}</p>
        
        <form onSubmit={handleFilterApply} className="mt-4 flex gap-2">
          <input
            type="text"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder="Enter source filter..."
            className="px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply Filter
          </button>
        </form>
      </div>

      <h1>All feedback</h1>
      <ul>
        {studentInputs.map((input) => (
          <li key={input._id}>
            <p>Activity Name: {input.activityName}</p>
            <p>Feedback: <span className="feedback-text">{input.answerQ1}</span></p>
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
