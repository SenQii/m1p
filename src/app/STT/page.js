"use client";
import React, { useState } from "react";
import { URL } from "../../../lib/constant";
import Link from "next/link";
import { FiCommand } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

function SpeechToText() {
  const [script, setScript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [color, setColor] = useState("red");
  const [errToast, setErrToast] = useState(false);

  let stt = "";

  // Start or stop recording
  const toggleRecording = () => {
    const startRecording = () => {
      if (typeof window !== "undefined") {
        // Client-side-only code
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const SpeechGrammarList =
          window.SpeechGrammarList || window.webkitSpeechGrammarList;
        const SpeechRecognitionEvent =
          window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

        // Start recording and handle speech recognition
        const recognition = new SpeechRecognition();
        const speechRecognitionList = new SpeechGrammarList();
        recognition.continuous = false;
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onstart = (e) => {
          console.log("Recording started");
        };
        recognition.onresult = (event) => {
          const speechToText = event.results[0][0].transcript;
          setScript(speechToText);
          stt = speechToText.toLowerCase();

          //   saveTranscript(speechToText);
        };
        recognition.onend = (e) => {
          console.log("Recording stopped");
          if (stt.length <= 0) {
            toast.error("تعذر التعرف على الصوت");
          } else {
            console.log("Saving transcript:", stt);
            saveTranscript(stt);
            toast.success("تم حفظ النص");
          }
          recognition.stop();
          setIsRecording(false);
        };

        recognition.start();
        setIsRecording(true);
      }
    };
    // Stop recording
    const stopRecording = () => {
      setIsRecording(false);
    };

    if (!isRecording) {
      console.log("start recording");
      startRecording();
    } else {
      console.log("stop recording");
      stopRecording();
    }
  };

  // Save the transcript to the database
  const saveTranscript = async (text) => {
    try {
      const response = await fetch(`${URL}/stt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to save transcript");
      }
    } catch (error) {
      console.error("Error saving transcript:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <header
        className="absolute top-0 w-full py-8 items-center justify-center bg-gray-900
    "
      >
        <h1 className="text-4xl font-bold">Speech to Text Converter</h1>
        <span>ENG ONLY</span>
      </header>
      {!isRecording && (
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg mb-4`}
          onClick={toggleRecording}
        >
          Hold to talk
        </button>
      )}
      <span className="text-lg font-semibold mb-4">
        {isRecording ? (
          <FiCommand className="animate-spin" />
        ) : (
          "Press the button and start speaking"
        )}
      </span>
      <div className="transcript p-4 bg-gray-200 rounded-lg shadow-md text-gray-900">
        <p className="text-lg">{script || "Your speech will appear here..."}</p>
      </div>
      <footer className="fixed bottom-0 w-full py-8 items-center justify-center bg-gray-900">
        <Link href="/" className=" hover:underline">
          controls
        </Link>
      </footer>
    </div>
  );
}

export default SpeechToText;
