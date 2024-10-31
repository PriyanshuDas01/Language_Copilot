"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import Image from "next/image";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "ar", name: "Arabic" },
  { code: "ko", name: "Korean" },
  { code: "nl", name: "Dutch" },
  { code: "tr", name: "Turkish" },
  { code: "pl", name: "Polish" },
  { code: "sv", name: "Swedish" },
  { code: "no", name: "Norwegian" },
  { code: "da", name: "Danish" },
  { code: "fi", name: "Finnish" },
  { code: "th", name: "Thai" },
];

export function LanguageTranslator() {
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("hi");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  useCopilotReadable({ description: "Available languages", value: JSON.stringify(languages) });
  useCopilotReadable({ description: "Input language", value: inputLang });
  useCopilotReadable({ description: "Output language", value: outputLang });
  useCopilotReadable({ description: "Input text", value: inputText });

  useCopilotAction({
    name: "Translate",
    description: "Translate input text",
    parameters: [
      { name: "inputLang", description: "Input language code", type: "string" },
      { name: "outputLang", description: "Output language code", type: "string" },
      { name: "inputText", description: "Text to translate", type: "string" },
    ],
    handler: async ({ inputLang, outputLang, inputText }) => {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputLang, outputLang, inputText }),
      });
      const data = await response.json();
      setOutputText(data.outputText);
    }
  });

  const handleTranslate = async () => {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputLang, outputLang, inputText }),
    });
    const data = await response.json();
    setOutputText(data.outputText);
  };

  return (
    <div className="relative bg-black w-[1000vh] flex justify-center items-center p-8">
      {/* Randomly positioned images outside the main container */}
      <Image src="/g.png" alt="decoration" width={100} height={100} className="absolute top-10 left-10" />
      <Image src="/a.png" alt="decoration" width={100} height={100} className="absolute top-20 right-16" />
      <Image src="/h.png" alt="decoration" width={100} height={100} className="absolute top-[60vh] left-3" />
      <Image src="/g.png" alt="decoration" width={100} height={100} className="absolute top-[80vh] right-16" />
      <div className="bg-teal-500 w-[100vh] flex justify-center items-center p-8">
        <div className="bg-teal-600 min-h-screen flex justify-center items-center p-8">
          <div className="bg-teal-700 min-h-screen flex justify-center items-center p-8">
            <div className="bg-teal-800 min-h-screen flex justify-center items-center p-8">
              <div className="bg-teal-900 min-h-screen flex justify-center items-center p-8">
                <div className="container max-w-4xl px-10 py-10 bg-gray-900 rounded-lg shadow-2xl text-white space-y-8">
                  
                  <div className="flex items-center gap-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white py-5 pt-[10vh] ml-8">Language Translator</h1>
                      <p className="text-gray-400 mt-2 ml-10 pb-[10vh]">Open the gates of borderless communication</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-800 rounded-lg shadow-inner space-y-6">
                    <h2 className="text-2xl font-semibold text-teal-400 ml-20 py-[3vh]">Select Languages</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <Select value={inputLang} onValueChange={setInputLang}>
                        <SelectTrigger className="bg-gray-700 text-teal-300 shadow-lg">
                          <SelectValue placeholder="Input Language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code} className="text-gray-300">
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={outputLang} onValueChange={setOutputLang}>
                        <SelectTrigger className="bg-gray-700 text-teal-300 shadow-lg">
                          <SelectValue placeholder="Output Language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code} className="text-gray-300">
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <h2 className="text-2xl font-semibold text-teal-400 ml-32 py-[3vh]">Convert</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <Textarea
                        placeholder="Type text to translate..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="h-40 p-4 text-white bg-gray-700 border border-gray-600 rounded-lg"
                      />
                      <div
                        className="border border-gray-600 rounded-lg p-4 h-40 overflow-auto bg-gray-700 text-gray-100 shadow-inner"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setOutputText(e.currentTarget.textContent || "")}
                      >
                        {outputText}
                      </div>
                    </div>
                    <Button onClick={handleTranslate} className="w-full bg-teal-500 text-white py-3 rounded-lg shadow-lg hover:bg-teal-400 transition duration-300 ease-in-out transform hover:scale-105">
                      Translate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
