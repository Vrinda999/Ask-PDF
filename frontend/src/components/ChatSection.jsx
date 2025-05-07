// Core Chat Interface.
// Displays Chat Messages and Input Box for Typing in Query.

import { useState, useEffect } from 'react';
import axios from "axios";

const ChatSection = ({ filename }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND;

    useEffect(() => {
        const fetchHistory = async () => {
            if (!filename) return;

            try {
                // Retrieves the Saved Chat and Displays in the Chat Interface.
                // Helps Store the Answers and History when Selected File Changes.
                const response = await axios.get(`${BACKEND_URL}/chat-history/${filename}`);
                setMessages([
                    {
                        sender: "system",
                        text: `📄 "${filename}" selected. You can now ask questions about this file.`,
                    },
                    ...response.data
                ]);
            } catch (err) {
                console.error("Failed to fetch history:", err);
                setMessages([
                    {
                        sender: "system",
                        text: `📄 "${filename}" selected, but couldn't load history.`,
                    }
                ]);
            }
        };

        fetchHistory();
    }, [filename, BACKEND_URL]);


    // Sends Question to Backend and Saves Messages to MongoDB
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input, filename };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post(`${BACKEND_URL}/ask`, {
                filename,
                question: input,
            });

            const assistantText = response.data?.answer || "No answer received.";
            const assistantMessage = { sender: "assistant", text: assistantText, filename };

            setMessages((prev) => [...prev, assistantMessage]);

            // Saving Messages sent by Both - the User, and the Assistant (LLM) - to MongoDB for Retrieval Later On.
            await axios.post(`${BACKEND_URL}/save-message`, {
                sender: "user",
                text: input,
                filename,
            });
            await axios.post(`${BACKEND_URL}/save-message`, {
                sender: "assistant",
                text: response.data.answer,
                filename,
            });

        } catch (err) {
            console.error("Chat error:", err);
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: "Failed to reach server." },
            ]);
        }
    };



    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };


    return (
        <div className="flex flex-col h-full p-4 pb-12 w-1/2 place-self-center ">
            <h2 className="text-xl font-semibold mb-8">
                Chat with LLaMA
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded 
                        ${msg.sender === "user" ? ` bg-[var(--user-chat-bg)] text-[var(--user-chat-text)] 
                        dark:bg-[var(--user-chat-bg)] dark:text-[var(--user-chat-text)] 
                        max-w-2/3 place-self-end text-justify px-4`
                                :
                                `bg-[var(--ai-chat-bg)] text-[var(--ai-chat-text)] 
                        dark:bg-[var(--ai-chat-bg)] dark:text-[var(--ai-chat-text)] 
                        place-self-start text-justify px-4`}
                        `}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a Question..."
                    className="flex-1 p-2 border-2 border-[var(--icon-color)] rounded"
                />
                <button
                    onClick={sendMessage}
                    className="bg-[var(--ai-green)] text-white px-4 py-2 rounded cursor-pointer"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatSection;