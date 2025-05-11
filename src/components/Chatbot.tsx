import React, { useState, useEffect, useRef } from 'react';
import { nftData } from '../data/nftData';
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
    let rawBotResponseText: string = "";
    let potentialNftFromInput: typeof nftData[0] | undefined = undefined;
    let searchStringForNftName = "";

    // Specific pattern match first
    const priceQuerySpecificPattern = /how much is artwork in usd (.*)/i;
    const specificMatch = lowerInput.match(priceQuerySpecificPattern);

    if (specificMatch && specificMatch[1]) {
        searchStringForNftName = specificMatch[1].trim();
    } else {
        // Fallback to broader heuristic if specific pattern doesn't match
        const keywordsToStrip = ["price of", "cost of", "usd price of", "description of", "about", "buy", "how much is", "what is the price of", "tell me about", "artwork", "in usd", "usd", "in", "the", "of", "an", "a", "is"];
        let tempSearchString = lowerInput;
        
        keywordsToStrip.forEach(keyword => {
            // Using a regex with word boundaries for keywords to avoid partial matches within words
            // and 'gi' for global, case-insensitive match
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            tempSearchString = tempSearchString.replace(regex, "");
        });
        searchStringForNftName = tempSearchString.replace(/\s\s+/g, ' ').trim(); // Remove extra spaces
    }

    if (searchStringForNftName) {
        potentialNftFromInput = nftData.find(
            nft => nft.name.toLowerCase().includes(searchStringForNftName) ||
                   searchStringForNftName.includes(nft.name.toLowerCase()) ||
                   nft.symbol.toLowerCase() === searchStringForNftName
        );
    }
    
    if (potentialNftFromInput) {
      const nft = potentialNftFromInput;
      if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('usd') || lowerInput.includes('how much')) {
        rawBotResponseText = `${nft.name} (${nft.symbol}) costs $${nft.usdPrice} USD.`;
        if (nft.polPrice) {
            rawBotResponseText += ` / ${nft.polPrice} POL.`;
        }
      } else if (lowerInput.includes('how to buy') || lowerInput.includes('buy')) {
        rawBotResponseText = `To buy ${nft.name} (${nft.symbol}), you'll typically connect your crypto wallet to the marketplace and use MATIC (Polygon) or the equivalent USD value. Specific instructions are usually provided on the NFT's page or the marketplace's help section. General steps: 1. Ensure your wallet is funded. 2. Click the 'Buy' button for ${nft.name}. 3. Approve the transaction in your wallet.`;
      } else if (lowerInput.includes('description') || lowerInput.includes('about')) {
        rawBotResponseText = `${nft.name} (${nft.symbol}): ${nft.description}`;
      } else {
        rawBotResponseText = `I have information about ${nft.name} (${nft.symbol}). You can ask for its description, price in USD, or how to buy it.`;
      }
    }

    if (!rawBotResponseText && (lowerInput.includes('list all nfts') || lowerInput.includes('show all nfts'))) {
      rawBotResponseText = "Here are all the available NFTs and their symbols: \n" + nftData.map(nft => `- ${nft.name} (${nft.symbol})`).join('\n');
    }

    if (!rawBotResponseText) {
      if (!model) {
        rawBotResponseText = "I'm having trouble connecting to my knowledge base right now. Please try again later.";
      } else {
        try {
          const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
              { role: "user", parts: [{ text: "You are a friendly and helpful assistant for an NFT marketplace and the MUSEO DE ARTE CONTEMPORANEO DE QUINTANA ROO. Be pleasant and informative. Prioritize information from the provided NFT data if the question is about specific NFTs, their prices, descriptions, or how to buy them. Only use general knowledge for other topics or if local data is insufficient." }] },
              { role: "model", parts: [{ text: "Understood! I'm ready to help with information about our beautiful NFTs and the wonderful MUSEO DE ARTE CONTEMPORANEO DE QUINTANA ROO. How can I assist you today? I'll use my specific knowledge about the listed NFTs first." }] },
            ],
          });
          const result = await chat.sendMessage(userInput);
          const response = result.response;
          rawBotResponseText = response.text();
        } catch (error) {
          console.error("Error calling Google AI:", error);
          rawBotResponseText = "I encountered an issue while trying to get that information. Please try asking in a different way.";
        }
      }
    }
    
    const finalBotResponseText = rawBotResponseText.replace(/\*/g, ''); 
    setIsTyping(false);
    setMessages(prevMessages => [...prevMessages, { text: finalBotResponseText, sender: 'bot' }]);
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
