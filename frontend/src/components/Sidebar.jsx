// Lists All The Uploaded Files
// Clicking on a File Name Updates the Active Chat Session.

import { React } from "react";

const Sidebar = ({ files, onSelectFile, onClose, selectedFile }) => {
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
                            className={`cursor-pointer px-3 py-2 rounded
                            border 
                            ${selectedFile === file
                                    ?
                                    `border-(--icon-border) dark:border-(--icon-color)
                                    text-[var(--text-standard)] dark:text-[var(--text-standard)]
                                    bg-[var(--nav-darker)] dark:bg-[var(--nav-darker)] 
                                    hover:bg-[var(--icon-color)] hover:dark:bg-[var(--icon-color)] hover:text-[var(--text-rev-std)] hover:dark:text-[var(--text-rev-std)]`
                                    :
                                    `border-(--icon-border) dark:border-(--icon-color)
                                    text-[var(--text-standard)] dark:text-[var(--text-standard)]
                                    bg-[var(--nav-bg-color)] dark:bg-[var(--nav-bg-color)] 
                                    hover:bg-[var(--icon-color)] hover:dark:bg-[var(--icon-color)] hover:text-[var(--text-rev-std)] hover:dark:text-[var(--text-rev-std)]`
                                }
                        `}
                            onClick={() => {
                                onSelectFile(file);
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