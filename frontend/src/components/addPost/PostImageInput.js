"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var FileUploader = function (_a) {
    var onFileSelect = _a.onFileSelect;
    var _b = (0, react_1.useState)(null), file = _b[0], setFile = _b[1];
    var handleFileChange = function (event) {
        var _a;
        var selectedFile = ((_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        setFile(selectedFile);
        onFileSelect(selectedFile); // Pass file to parent
    };
    var handleDragOver = function (event) {
        event.preventDefault();
    };
    var handleDrop = function (event) {
        var _a;
        event.preventDefault();
        var droppedFile = ((_a = event.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        setFile(droppedFile);
        onFileSelect(droppedFile);
    };
    return (<div className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 my-5 transition-all duration-300" onDragOver={handleDragOver} onDrop={handleDrop}>
      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*"/>
      <lucide_react_1.UploadCloud className="w-10 h-10 text-gray-500"/>
      <p className="mt-2 text-sm text-gray-700">
        Drag & Drop or Click to Upload
      </p>

      {file && (<div className="mt-4 flex flex-col items-center">
          <img src={URL.createObjectURL(file)} alt="Preview" className="w-20 h-20 object-cover rounded-md shadow-md"/>
          <p className="mt-2 text-xs text-gray-500">{file.name}</p>
        </div>)}
    </div>);
};
exports.default = FileUploader;
