import { useState, useEffect } from 'react';
import axios from "axios";

const ChatSection = ({ filename }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // ✅ Reset chat with new file
    useEffect(() => {
        if (filename) {
            setMessages([
                {
                    sender: "system",
                    text: `📄 "${filename}" selected. You can now ask questions about this file.`,
                }
            ]);
        }
    }, [filename]);


    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post("http://localhost:8000/ask", {
                filename,
                question: input,
            });

            if (response.data?.answer) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "assistant", text: response.data.answer },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { sender: "assistant", text: "No answer received." },
                ]);
            }
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
            <h2 className="text-xl font-semibold mb-8">Chat with LLaMA</h2>
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