import React, { useState, useEffect, useRef } from 'react';
import { nftData, type NftInfo } from '../data/nftData';
import './Chatbot.css';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // For bot typing indicator
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  let genAI: GoogleGenerativeAI | null = null;
  if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
  } else {
    console.error("Google AI API Key not found. Please set VITE_GOOGLE_AI_API_KEY in your .env file.");
  }

  const model = genAI?.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ sender: 'bot', text: "Hello! I'm your friendly art and NFT assistant. Ask me about the NFTs, the MUSEO DE ARTE CONTEMPORANEO DE QUINTANA ROO, or how to buy digital art!" }]);
    } else {
      setMessages([]);
      setInput('');
    }
  }, [isOpen]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsTyping(true);
    processUserMessage(input);
    setInput('');
  };

  const processUserMessage = async (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let botResponseText: string;

    // Prioritize local NFT data
    const foundNft = nftData.find(
      nft => nft.name.toLowerCase().includes(lowerInput) || nft.symbol.toLowerCase() === lowerInput || lowerInput.includes(nft.symbol.toLowerCase())
    );

    if (foundNft) {
      if (lowerInput.includes('how to buy') || lowerInput.includes('buy')) {
        botResponseText = `To buy ${foundNft.name} (${foundNft.symbol}), you'll typically connect your crypto wallet to the marketplace and use MATIC (Polygon) or the equivalent USD value. Specific instructions are usually provided on the NFT's page or the marketplace's help section. General steps: 1. Ensure your wallet is funded. 2. Click the 'Buy' button for ${foundNft.name}. 3. Approve the transaction in your wallet.`;
      } else if (lowerInput.includes('description') || lowerInput.includes('about') || lowerInput.includes(foundNft.name.toLowerCase())) {
        botResponseText = `${foundNft.name} (${foundNft.symbol}): ${foundNft.description}`;
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        botResponseText = `${foundNft.name} (${foundNft.symbol}) costs $${foundNft.usdPrice} USD or ${foundNft.polPrice} POL.`;
      } else {
        botResponseText = `I found ${foundNft.name} (${foundNft.symbol}). What would you like to know about it? You can ask for its description, price, or how to buy it.`;
      }
      setIsTyping(false);
      setMessages(prevMessages => [...prevMessages, { text: botResponseText, sender: 'bot' }]);
      return;
    }
    
    if (lowerInput.includes('list all nfts') || lowerInput.includes('show all nfts')) {
        botResponseText = "Here are all the available NFTs and their symbols: \n" + nftData.map(nft => `- ${nft.name} (${nft.symbol})`).join('\n');
        setIsTyping(false);
        setMessages(prevMessages => [...prevMessages, { text: botResponseText, sender: 'bot' }]);
        return;
    }

    // If not found locally or a general query, use Google AI
    if (!model) {
      botResponseText = "I'm having trouble connecting to my knowledge base right now. Please try again later.";
      setIsTyping(false);
      setMessages(prevMessages => [...prevMessages, { text: botResponseText, sender: 'bot' }]);
      return;
    }

    try {
      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          { role: "user", parts: [{ text: "You are a friendly and helpful assistant for an NFT marketplace and the MUSEO DE ARTE CONTEMPORANEO DE QUINTANA ROO. Be pleasant and informative." }] },
          { role: "model", parts: [{ text: "Understood! I'm ready to help with information about our beautiful NFTs and the wonderful MUSEO DE ARTE CONTEMPORANEO DE QUINTANA ROO. How can I assist you today?" }] },
        ],
      });
      const result = await chat.sendMessage(userInput);
      const response = result.response;
      botResponseText = response.text();
    } catch (error) {
      console.error("Error calling Google AI:", error);
      botResponseText = "I encountered an issue while trying to get that information. Please try asking in a different way.";
    }
    
    setIsTyping(false);
    setMessages(prevMessages => [...prevMessages, { text: botResponseText, sender: 'bot' }]);
  };

  if (!isOpen) {
    return (
      <button className="chatbot-toggle-button" onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>Chat with NFT Bot</span>
      </button>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <svg className="chatbot-header-icon" aria-hidden="true" focusable="false" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="60" height="50" rx="10" ry="10" className="robot-head" />
          <rect className="robot-eye robot-eye-left" x="32" y="42" width="12" height="12" rx="3" ry="3" />
          <rect className="robot-eye robot-eye-right" x="56" y="42" width="12" height="12" rx="3" ry="3" />
          <line x1="50" y1="30" x2="50" y2="18" className="robot-antenna" strokeWidth="4" />
          <circle cx="50" cy="12" r="6" className="robot-antenna-light" />
        </svg>
        <h2>NFT Info Bot</h2>
        <button onClick={() => setIsOpen(false)} className="chatbot-close-button">X</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
          </div>
        ))}
        {isTyping && <div className="message bot typing-indicator"><p>...</p></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
          placeholder="Ask about NFTs or the Museum..."
          disabled={isTyping}
        />
        <button onClick={handleSend} disabled={isTyping}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
