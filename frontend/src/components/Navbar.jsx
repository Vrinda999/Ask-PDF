// Navigation Bar with Logo, Sidebar, Upload PDF button and Theme Toggle.

import { useState } from 'react';
import AIPlanetLogo from '../assets/ai_planet_logo.svg';
import ModalUpload from './ModalUpload';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ onToggleSidebar, onUploadSuccess }) => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    // Handles Display of Modal after Successful Uploading of File.
    const handleUploadSuccess = (filename) => {
        onUploadSuccess(filename); // pass it to parent
        setIsUploadOpen(false);    // close modal
    };


    return (
        <>
            <nav className="fixed top-0 left-0 z-[50] mb-20 flex items-center justify-between py-2 px-2 w-full outline-1 outline-[var(--icon-color)]
            bg-[var(--nav-bg-color)] dark:bg-[var(--nav-bg-color)
        ">
                <div className='flex flex-row align-middle items-center'>
                    <div className="
                    flex flex-shrink-0 text-[var(--text-standard)] dark:text-[var(--text-standard)] font-serif text-2xl sm:text-4xl
                    m-4 gap-10 w-[80%] sm:max-w-[10%] sm:h-auto
                    ">

                        <img
                            className='rounded-md'
                            src={AIPlanetLogo}
                            alt='AI Planet Logo`'

                        />
                    </div>
                    <div>

                        <button
                            className="z-[51] cursor-pointer flex items-center gap-2 text-lg sm:text-xl font-medium px-4 py-2 rounded-md border-2 border-(--icon-border) dark:border-(--icon-color)
                        text-[var(--text-standard)] dark:text-[var(--text-standard)]
                        bg-[var(--nav-bg-color)] dark:bg-[var(--nav-bg-color)] 
                        hover:bg-[var(--icon-color)] hover:dark:bg-[var(--icon-color)] hover:text-[var(--text-rev-std)] hover:dark:text-[var(--text-rev-std)]"
                            onClick={onToggleSidebar}
                        >
                            Uploaded PDFs
                        </button>
                    </div>
                </div>

                <div className='m-4 flex flex-row align-middle items-center justify-center gap-6 text-3xl px-2'>
                    <div className="flex flex-shrink-0 items-center space-x-4">
                        <button
                            className="z-[51] cursor-pointer flex items-center gap-2 text-lg sm:text-xl font-medium px-4 py-2 rounded-md border-2 border-(--icon-border) dark:border-(--icon-color)
                        text-[var(--text-standard)] dark:text-[var(--text-standard)]
                        bg-[var(--nav-bg-color)] dark:bg-[var(--nav-bg-color)] 
                        hover:bg-[var(--icon-color)] hover:dark:bg-[var(--icon-color)] hover:text-[var(--text-rev-std)] hover:dark:text-[var(--text-rev-std)]"

                            onClick={() => setIsUploadOpen(true)}
                        >
                            Upload PDF
                        </button>
                    </div>

                    <DarkModeToggle />
                </div>
            </nav >

            {/* 
            Dynamic Upload Handling and Closing of Modal.
            */}
            <ModalUpload
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUploadSuccess={handleUploadSuccess}
            />
        </>
    );
};

export default Navbar;