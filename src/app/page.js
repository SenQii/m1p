"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { URL } from "../../lib/constant";

export default function Home() {
  const [sent, setSent] = useState(false);
  // send them
  const handleDirection = async (dir) => {
    console.log("direction inserted: ", dir);
    const response = await fetch(`${URL}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ direction: dir }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    setSent(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full w-full">
      <h1 className="text-2xl font-bold mb-8">dir btns:</h1>
      <div className="flex flex-col items-center justify-center w-full h-2/4 bg-gray-900 text-white rounded-lg shadow-md p-6">
        <div className="w-1/2 h-full flex flex-col items-center justify-center space-y-6">
          <div>
            <button
              onClick={() => handleDirection("up")}
              className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Up
            </button>
          </div>
          <div className="flex justify-around w-full">
            <button
              onClick={() => handleDirection("left")}
              className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Left
            </button>
            <button
              onClick={() => handleDirection("right")}
              className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Right
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDirection("down")}
              className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Down
            </button>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full py-8 flex items-center justify-center bg-gray-900">
        <Link href="/log" className="text-white hover:underline">
          log
        </Link>
      </footer>
    </div>
  );
}
