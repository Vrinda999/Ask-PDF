import { useState } from 'react';

const ChatSection = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        setMessages([...messages, userMessage]);
        setInput("");

        const response = await fetch("http://localhost:8000/ask", {
            method: "POST",
            body: new URLSearchParams({ filename: "sample.pdf", question: input })
        });

        const data = await response.json();
        const botMessage = { role: "bot", text: data.Answer.response || data.Answer };
        setMessages(prev => [...prev, botMessage]);
    };

    return (
        <div className="flex flex-col h-full p-4 pb-12 w-1/2 place-self-center ">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded 
                        ${msg.role === "user" ? ` bg-[var(--user-chat-bg)] text-[var(--user-chat-text)] 
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
                    placeholder="Ask a question..."
                    className="flex-1 p-2 border rounded"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
            </div>
        </div>
    );
};

export default ChatSection;