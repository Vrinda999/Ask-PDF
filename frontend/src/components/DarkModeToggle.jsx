import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "motion/react"

const DarkModeToggle = () => {
  // Importing Dark Mode Colours
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );


  // Dynamic Update of Colours
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    // Animated Button UwU
    <motion.button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full cursor-pointer
      bg-[var(--icon-color)] dark:bg-[var(--icon-color)]
      text-[var(--text-rev-std)] dark:text-[var(--text-rev-std)]
      
      transition delay-150 duration-300 ease-in-out hover:scale-115 transition-colors:color-[var(--text-cyan)]"

      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </motion.button>
  );
};

export default DarkModeToggle;