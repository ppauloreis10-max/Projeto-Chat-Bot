import { useState } from "react";
import "./ChatBot.css";

function ChatBot() {

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    const API_KEY = "SUA_CHAVE_AQUI";

    async function sendMessage() {

        if (!input.trim()) return;

        const userMessage = {
            sender: "Usuário",
            text: input
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentMessage = input;

        setInput("");

        try {

            const response = await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    method: "POST",

                    headers: {
                        "Authorization": `Bearer ${API_KEY}`,
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        model: "llama3-8b-8192",

                        messages: [
                            {
                                role: "user",
                                content: currentMessage
                            }
                        ]
                    })
                }
            );

            const data = await response.json();

            const botReply = {
                sender: "Groq IA",
                text: data.choices[0].message.content
            };

            setMessages((prev) => [...prev, botReply]);

        } catch (error) {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "Erro",
                    text: "Não foi possível conectar à API."
                }
            ]);

            console.error(error);
        }
    }

    return (
        <div id="chat-container">

            <div id="chat-window">

                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </p>
                ))}

            </div>

            <div className="input-area">

                <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button onClick={sendMessage}>
                    Enviar
                </button>

            </div>
        </div>
    );
}

export default ChatBot;