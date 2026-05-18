import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ChatBot from "./components/ChatBot";
import "./index.css";

function App() {

    return (
        <div className="app-container">

            <header className="header">

                <h1>ChatBot IA</h1>

                <p>Assistente virtual integrado com Groq API</p>

            </header>

            <main className="main-content">
                <ChatBot />
            </main>

            <footer className="footer">

                <p>Desenvolvido com React!</p>

            </footer>

        </div>
    );
}

export default App;