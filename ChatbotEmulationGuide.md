# Chatbot Emulation Guide

## Introduction

This document provides a guide for developers to emulate the chatbot logic from the current project in another project. It covers the necessary dependencies, code structure, logic explanation, and adaptation steps.

## Dependencies

The following dependencies are required for the chatbot:

-   `@google/generative-ai`: For integrating with the Google Generative AI model.
-   `react`: For building the user interface.
-   `react-dom`: For rendering React components in the browser.
-   `i18next`: For internationalization (if needed).
-   `react-i18next`: For using i18next with React (if needed).
-   `thirdweb`: For web3 functionalities (if needed).

To install these dependencies, use npm or yarn:

```bash
npm install @google/generative-ai react react-dom i18next react-i18next thirdweb
# or
yarn add @google/generative-ai react react-dom i18next react-i18next thirdweb
```

## Code Structure

The main component of the chatbot is `Chatbot.tsx`. It includes the following parts:

-   **Imports:** Imports necessary modules from React and other libraries.
-   **Interfaces:** Defines the `Message` interface for representing chat messages.
-   **State Variables:**
    -   `messages`: An array of `Message` objects representing the chat history.
    -   `input`: The current user input.
    -   `isOpen`: A boolean indicating whether the chatbot is open.
    -   `isTyping`: A boolean indicating whether the bot is typing.
-   **API Key and Model Setup:** Initializes the Google Generative AI model with the API key.
-   **Configuration:** Sets up generation and safety configurations for the AI model.
-   **`scrollToBottom` Function:** Scrolls the chat window to the bottom when new messages are added.
-   **`useEffect` Hooks:**
    -   Scrolls to the bottom on message updates.
    -   Initializes the chatbot with a welcome message when it opens.
-   **`handleSend` Function:** Sends the user message to the bot and processes the response.
-   **`processUserMessage` Function:** Processes the user message, interacts with the Google Generative AI model, and generates the bot response.
-   **JSX Structure:** Renders the chatbot UI, including the header, messages, input field, and send button.

## Logic Explanation

The core logic of the chatbot involves the following steps:

1.  **Initialization and API Key Setup:**
    -   The Google Generative AI model is initialized with the API key from the `.env` file.
    -   Ensure that the `VITE_GOOGLE_AI_API_KEY` environment variable is set correctly.

2.  **Message Handling and State Management:**
    -   The `messages` state variable stores the chat history.
    -   The `input` state variable stores the current user input.
    -   The `setMessages` and `setInput` functions are used to update these state variables.

3.  **Integration with the Google Generative AI Model:**
    -   The `processUserMessage` function sends the user input to the Google Generative AI model.
    -   The model generates a response based on the input and the configured settings.
    -   The response is then added to the chat history.

4.  **NFT Data Processing and Response Generation:**
    -   The `processUserMessage` function also processes NFT-related queries.
    -   It searches the `nftData` array for relevant information based on the user input.
    -   If a match is found, it generates a response with the NFT's name, symbol, price, or description.

## Adaptation Steps

To adapt the chatbot logic to another project, follow these steps:

1.  **Set up the API Key:**
    -   Obtain a Google Generative AI API key and set it as an environment variable in your project.
    -   Ensure that the environment variable is accessible in your code.

2.  **Create the Necessary UI Components:**
    -   Create the UI components for the chatbot, including the header, messages, input field, and send button.
    -   Use React or another UI library to build these components.

3.  **Implement the Message Handling Logic:**
    -   Implement the `handleSend` function to send user messages to the bot.
    -   Implement the `processUserMessage` function to process user messages and generate bot responses.

4.  **Integrate with a Different Data Source (if needed):**
    -   If you want to use a different data source for NFT information, modify the `processUserMessage` function to fetch data from the new source.
    -   Update the logic to handle the new data format and generate appropriate responses.

## Conclusion

By following this guide, you should be able to successfully emulate the chatbot logic in another project. Remember to set up the API key, create the necessary UI components, implement the message handling logic, and integrate with a different data source if needed. Good luck!
