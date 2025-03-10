import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const analyzeContentWithAI = async (text) => {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          prompt: `Analyze this text for grammar, readability, and suggestions:\n\n${text}`,
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      setAiSuggestions(data.choices[0].text.split("\n"));
    } catch (error) {
      console.error("AI Analysis failed:", error);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-gray-900 border border-gray-700 text-white">
      {/* Editor */}
      <Editor
        apiKey="2jjxw1mab1i3habncaof33vr3apmvyh4nylgg1zb58h7rl7h"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        onEditorChange={(newContent, editor) => {
          if (newContent !== editorRef.current.getContent()) {
            onChange(newContent);
            analyzeContentWithAI(newContent);
          }
        }}
        init={{
          height: 400,
          menubar: false,
          branding: false,
          skin: "oxide-dark",
          content_css: "dark",
          plugins: "lists link image code table direction",
          toolbar:
            "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code | ltr rtl",
          directionality: "ltr",
          content_style: `
            body { font-family: 'SF Pro Display', sans-serif; font-size: 16px; color: white; background: #1e1e1e; direction: ltr; }
            a { color: #3b82f6; }
          `,
        }}
      />

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-400">
            AI Suggestions
          </h3>
          <ul className="list-disc ml-4 text-gray-300">
            {aiSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TinyMCEEditor;
