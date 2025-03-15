import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillEditor = ({ content, onChange }) => {
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState(content || "");

  useEffect(() => {
    if (content !== editorContent) {
      setEditorContent(content);
    }
  }, [content]);

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
    onChange(newContent);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-2xl border border-gray-700 text-white">
      {/* Custom Toolbar */}
      <div className="mb-2 px-2 py-2 flex items-center space-x-4 bg-gray-800 rounded-lg shadow-md">
        <button className="px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition">
          B
        </button>
        <button className="px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition">
          I
        </button>
        <button className="px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition">
          U
        </button>
        <button className="px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition">
          H1
        </button>
        <button className="px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition">
          H2
        </button>
        <button className="px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition">
          🔗
        </button>
        <button className="px-3 py-1 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition">
          🖼
        </button>
      </div>

      {/* Quill Editor */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            [{ align: [] }],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "font",
          "list",
          "bold",
          "italic",
          "underline",
          "link",
          "image",
          "align",
        ]}
        className="text-white bg-gray-800 border-none rounded-lg p-2 focus:outline-none"
      />
    </div>
  );
};

export default ReactQuillEditor;
