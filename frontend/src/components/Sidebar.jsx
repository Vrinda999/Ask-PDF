import React from "react";

const Sidebar = ({ files, onSelectFile, onClose }) => {
    return (
        <div className="fixed left-0 top-24 w-64 h-full z-40 p-4 overflow-y-auto
            mb-20 py-2 px-2 outline-1 outline-[var(--icon-color)]
            bg-[var(--nav-bg-color)] dark:bg-[var(--nav-bg-color)
        ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold m-2
                text-[var(--text-standard)] dark:text-[var(--text-standard)]">
                    Uploaded PDFs
                </h2>
                <button
                    onClick={onClose}
                    className="text-md text-[var(--red-500)] hover:text-[var(--red-700)] cursor-pointer m-2"
                >
                    Close
                </button>
            </div>
            {files.length === 0 ? (
                <p className="text-sm text-gray-500">No files uploaded yet.</p>
            ) : (
                <ul className="space-y-2">
                    {files.map((file, idx) => (
                        <li
                            key={idx}
                            className="cursor-pointer px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                            onClick={() => {
                                onSelectFile(file);
                                onClose(); // Optional: close sidebar after selecting
                            }}
                        >
                            {file}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Sidebar;