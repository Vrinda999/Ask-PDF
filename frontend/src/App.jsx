import './App.css'
import { ChatSection, Navbar, Sidebar } from './components/Components'
import { useState } from 'react';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadSuccess = (filename) => {
    setUploadedFiles((prev) => [...prev, filename]);
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
    setShowSidebar(false); // Close sidebar when a file is selected
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-standard)] dark:bg-[var(--bg-color)] dark:text-[var(--text-standard)]">
      <Navbar
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        onUploadSuccess={handleUploadSuccess}
      />

      {showSidebar && (
        <Sidebar
          files={uploadedFiles}
          onSelectFile={handleSelectFile}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {selectedFile && (
        <div className="mt-24 flex justify-center">
          <ChatSection filename={selectedFile} />
        </div>
      )}    </div>
  );
};

export default App
