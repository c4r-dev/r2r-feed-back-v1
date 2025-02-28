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

  const exportToCSV = () => {
    // Convert data to CSV format
    const headers = ['Activity Name', 'Feedback', 'Comment', 'Date'];
    const csvRows = [headers];

    studentInputs.forEach(input => {
      csvRows.push([
        input.activityName,
        input.answerQ1,
        input.fbtool,
        new Date(input.createdAt).toLocaleString()
      ].map(field => 
        // Escape fields that contain commas or quotes
        typeof field === 'string' ? 
          `"${field.replace(/"/g, '""')}"` : 
          field
      ));
    });

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `feedback-export${source ? `-${source}` : ''}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Current Filter:</h2>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Export to CSV
          </button>
        </div>
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
