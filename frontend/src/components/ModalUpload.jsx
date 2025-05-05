import React, { useState } from "react";
import axios from "axios";

const ModalUpload = ({ isOpen, onClose, onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/upload", formData);
            if (response.status === 200) {
                onUploadSuccess(response.data.filename); // Modal closes from parent now
                setFile(null);                           // reset file
            }
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-[30] w-1/2 h-1/2 max-w-1/2 max-h-1/2 place-self-center
        bg-[var(--user-chat-text)] dark:bg-[var(--icon-color)] border-2 border-(--icon-border) dark:border-(--icon-color) 
        ">
            <div className="place-content-center items-center justify-center rounded text-center text-[var(--text-rev-std)] dark:text-[var(--text-rev-std)]">
                <h2
                    className="p-2 content-center text-lg font-semibold mb-4">
                    Upload PDF
                </h2>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-4 block mx-auto text-center cursor-pointer"
                />
                <div className="flex place-self-center justify-end space-x-4">
                    <button className="px-4 py-2 bg-gray-300 rounded cursor-pointer" onClick={onClose}>
                        Cancel
                    </button>
                    <button className={`px-4 py-2 
                    ${file ? "bg-[var(--ai-green)] text-white cursor-pointer"
                            :
                            "bg-gray-400 text-white cursor-not-allowed"}`}
                        onClick={handleUpload}
                        disabled={!file}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalUpload;
