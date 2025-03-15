"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_quill_1 = require("react-quill");
require("react-quill/dist/quill.snow.css");
var ReactQuillEditor = function (_a) {
    var content = _a.content, onChange = _a.onChange;
    var quillRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(content || ""), editorContent = _b[0], setEditorContent = _b[1];
    (0, react_1.useEffect)(function () {
        if (content !== editorContent) {
            setEditorContent(content);
        }
    }, [content]);
    var handleEditorChange = function (newContent) {
        setEditorContent(newContent);
        onChange(newContent);
    };
    return (<div className="bg-gray-900 p-4 rounded-xl shadow-2xl border border-gray-700 text-white">
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
      <react_quill_1.default ref={quillRef} theme="snow" value={editorContent} onChange={handleEditorChange} modules={{
            toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link", "image"],
                [{ align: [] }],
                ["clean"],
            ],
        }} formats={[
            "header",
            "font",
            "list",
            "bold",
            "italic",
            "underline",
            "link",
            "image",
            "align",
        ]} className="text-white bg-gray-800 border-none rounded-lg p-2 focus:outline-none"/>
    </div>);
};
exports.default = ReactQuillEditor;
