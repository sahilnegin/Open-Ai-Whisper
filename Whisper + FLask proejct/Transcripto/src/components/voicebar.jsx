import React, { useState } from "react";

export default function Voicebar() {
  const [audioFile, setAudioFile] = useState(null); // for storing uploaded audio
  const [transcript, setTranscript] = useState(""); // for showing the transcript
  const [loading, setLoading] = useState(false); // optional loading spinner

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Please upload an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      setLoading(true);
      const response = await fetch("https://3b93-34-125-16-145.ngrok-free.app/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Transcription failed");

      const data = await response.json(); // ✅ fetch requires manual JSON parsing
      setTranscript(data.transcription);
    } catch (error) {
      console.error("Upload error:", error);
      setTranscript("Error during transcription.");
    } finally {
      setLoading(false);
    }
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: "text/plain" }); // create a .txt file
    const url = URL.createObjectURL(blob); // create an object URL for the Blob
    const link = document.createElement("a"); // create an anchor tag for download
    link.href = url; // set the link to the object URL
    link.download = "transcript.txt"; // specify the filename
    link.click(); // trigger the download
    URL.revokeObjectURL(url); // clean up the object URL to avoid memory leaks
  };
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="text-4xl flex justify-center mt-4">
        <h1 className="font-serif">Transcripto</h1>
      </div>

      {/* Upload Section */}
      <div className="flex items-center justify-center w-full mt-8">
        <form
          className="flex flex-col items-center p-4 border border-dotted rounded-lg shadow-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-gray-400 mb-4">Upload An Audio File</h2>
          <input
            type="file"
            accept="audio/*"
            className="mb-4 p-2 border rounded"
            onChange={handleFileChange}
          />
        </form>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleUpload}
          className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 text-white"
        >
          Upload & Transcribe
        </button>
      </div>

      {/* Transcript Section */}
      <div className="bg-gray-400 flex justify-center items-center py-10 mt-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl font-serif">Transcript</div>
          <div className="bg-gray-300 p-4 rounded shadow w-full max-w-md">
            {loading ? (
              <p>Transcribing...</p>
            ) : transcript ? (
              <p>{transcript}</p>
            ) : (
              <p>No transcript yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      {transcript && !loading && (
        <div className="flex justify-center mt-4">
          <button
            onClick={downloadTranscript}
            className="bg-green-500 px-6 py-2 rounded hover:bg-green-600 text-white"
          >
            Download Transcript
          </button>
        </div>
      )}
    </div>
  );
}
