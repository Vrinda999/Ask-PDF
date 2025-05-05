import { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { LiaResearchgate } from 'react-icons/lia';
import DarkModeToggle from "./DarkModeToggle";
import AIPlanetLogo from "../assets/ai_planet_logo.svg"

// import DropdownOptions from './DropdownOptions';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Smoothly scroll to section and close dropdown
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false); // Close dropdown after navigating
        }
    };



    return (
        <nav className="fixed top-0 left-0 z-[50] mb-20 flex items-center justify-between py-2 px-2 w-full outline-1 outline-[#524438]
        bg-[var(--nav-bg-color)] dark:bg-[var(--nav-bg-color)
        ">

            <div className="
            flex flex-shrink-0 text-[var(--text-standard)] dark:text-[var(--text-standard)] font-serif text-2xl sm:text-4xl px-8
            sm:m-4 gap-10 image-height w-1/9
            ">

                <img
                    className='rounded-2xl'
                    src={AIPlanetLogo}
                    alt='AI Planet Logo`'

                />

                {/* Dropdown Menu */}
                <div className="dropdown-container relative">
                    {/* Menu Icon */}
                    {isOpen
                        ?
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center gap-2 text-lg sm:text-xl font-medium px-4 py-2 rounded-md shadow-md
                            text-[var(--text-standard)] dark:text-[var(--text-standard)] hover:text-[var(--text-purple-300)]
                            bg-[var(--bg-color)] dark:bg-[var(--bg-via-nav)] hover:bg-[var(--bg-color)] hover:dark:bg-[var(--bg-color)] hover:dark:text-[var(--text-purple-800)]"
                        >
                            <FaTimes />
                            Navigation
                        </button>
                        :
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center gap-2 text-lg sm:text-xl font-medium px-4 py-2 rounded-md shadow-md
                            text-[var(--text-standard)] dark:text-[var(--text-standard)] hover:text-[var(--text-purple-300)]
                            bg-[var(--bg-color)] dark:bg-[var(--bg-via-nav)] hover:bg-[var(--bg-color)] hover:dark:bg-[var(--bg-color)] hover:dark:text-[var(--text-purple-800)]"
                        >
                            <FaBars />
                            Navigation
                        </button>
                    }

                    {/* Dropdown Items */}
                    {isOpen && (
                        <div className="absolute mt-2 w-48 shadow-lg rounded-md overflow-hidden
                        bg-[var(--bg-color)] dark:bg-[var(--bg-via-nav)]
                        text-[var(--text-standard)] dark:text-[var(--text-standard)]
                        ">
                            <ul className="flex flex-col">
                                {[
                                    { id: "Me", label: "About Me" },
                                    { id: "Experience", label: "Experience" },
                                    { id: "Technologies", label: "Skills" },
                                    { id: "Projects", label: "Projects" },
                                    { id: "Publications", label: "Publications" },
                                    { id: "Contact", label: "Contact Me" },
                                ].map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-base py-2 cursor-pointer
                                        hover:bg-[var(--bg-color)] hover:text-[var(--text-purple-800)] hover:dark:bg-[var(--bg-color)] hover:dark:text-[var(--text-purple-800)]"
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>

            <div className='m-4 flex align-middle items-center justify-center gap-6 text-3xl px-2'>
                <DarkModeToggle />
            </div>
        </nav >
    );
};

export default Navbar;