// Renders the Navbar, Sidebar, and Main Chat Section(s).

import './App.css'
import { ChatSection, Navbar, Sidebar } from './components/Components'
import { useState } from 'react';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");

  const handleUploadSuccess = (filename) => {
    setUploadedFiles((prev) => [...prev, filename]);
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
    setShowSidebar(false); // Close sidebar when a file is selected
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-standard)] dark:bg-[var(--bg-color)] dark:text-[var(--text-standard)]">

      {/* 
      Handles Uploading of PDFs and Display Settings of Child Components like the Sidebar.
      */}
      <Navbar
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* 
      Passes the list of Uploaded Files, and Selected File to the Sidebar to handle Appropriate styling.
      Also handles the functionality of the 'Uploaded PDFs' Button, and helps the Sidebar Open and Close.
      */}
      {showSidebar && (
        <Sidebar
          files={uploadedFiles}
          selectedFile={selectedFile}
          onSelectFile={handleSelectFile}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {/* 
      Opens Chat Section for Selected File.
      */}
      {selectedFile && (
        <div className="mt-24 flex justify-center">
          <ChatSection filename={selectedFile} />
        </div>
      )}

    </div>
  );
};

export default App
