"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { URL } from "../../../lib/constant";

function Log() {
  const [data, setData] = useState(null);
  const [updated, setUpdated] = useState(false);

  // Fetch data from the server
  const getData = async () => {
    const response = await fetch(`${URL}/data`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const Data = await response.json();
    setData(Data);
  };

  useEffect(() => {
    getData();
    setUpdated(true);
  }, [updated]);

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center min-h-screen">
      <button
        className="absolute top-0 text-2xl font-semibold p-8 hover:underline italic"
        onClick={() => setUpdated(!updated)}
      >
        update
      </button>
      {data && updated ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item, index) => {
            console.log("item: ", item);
            return (
              <div
                key={index}
                className="item bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <p className="text-lg font-semibold">
                  Direction: {item.direction}
                </p>
                <p className="text-gray-600">ID: {item.id}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xl font-medium">Loading...</p>
      )}
      <footer className="absolute bottom-0 w-full py-8 items-center justify-center bg-gray-900">
        <Link href="/" className=" hover:underline">
          controls
        </Link>
      </footer>
    </div>
  );
}

export default Log;
