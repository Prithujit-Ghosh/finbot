// Get DOM elements
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');
const typingBubble = document.getElementById('typing-bubble');

// Initialize conversation history
let conversationHistory = [];

// Function to add a message to the chat window
function addMessageToChatWindow(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${role}-message`);
    messageDiv.textContent = text;
    chatWindow.appendChild(messageDiv);
    
    // Scroll to the bottom of the chat window
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to show/hide the typing indicator
function setTypingIndicatorVisibility(visible) {
    typingBubble.style.display = visible ? 'flex' : 'none';
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get user input
    const userPrompt = chatInput.value.trim();
    if (!userPrompt) return;

    // Display user message
    addMessageToChatWindow('user', userPrompt);

    // Add user message to conversation history
    conversationHistory.push({
        role: 'user',
        parts: [{ text: userPrompt }]
    });

    // Clear input field
    chatInput.value = '';

    // Show typing indicator
    setTypingIndicatorVisibility(true);

    try {
        // Send request to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: userPrompt,
                history: conversationHistory
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get response from server');
        }

        const data = await response.json();
        
        // Hide typing indicator
        setTypingIndicatorVisibility(false);

        // Display bot's response
        addMessageToChatWindow('bot', data.response);

        // Add bot's response to conversation history
        conversationHistory.push({
            role: 'model',
            parts: [{ text: data.response }]
        });

    } catch (error) {
        console.error('Error:', error);
        setTypingIndicatorVisibility(false);
        addMessageToChatWindow('bot', 'Sorry, I encountered an error. Please try again.');
    }
});