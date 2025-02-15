import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const FileUploader: React.FC<{ onFileSelect: (file: File | null) => void }> = ({
  onFileSelect,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    onFileSelect(selectedFile); // Pass file to parent
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0] || null;
    setFile(droppedFile);
    onFileSelect(droppedFile);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-300"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleFileChange}
        accept="image/*"
      />
      <UploadCloud className="w-10 h-10 text-gray-500" />
      <p className="mt-2 text-sm text-gray-700">
        Drag & Drop or Click to Upload
      </p>

      {file && (
        <div className="mt-4 flex flex-col items-center">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-md shadow-md"
          />
          <p className="mt-2 text-xs text-gray-500">{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
