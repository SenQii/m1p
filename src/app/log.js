"use client";
import React, { useState } from "react";

function log() {
  const [data, setData] = useState(null);

  // Fetch data from the server
  const getData = async () => {
    const response = await fetch("http://localhost:3000/data");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setData(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      {data ? (
        data.map((item, index) => {
          console.log("item: ", item);
          return (
            <div key={index} className="item">
              <p>ID: {item.id}</p>
              <p>Direction: {item.direction}</p>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default log;
