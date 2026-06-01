// Chat state
let messageHistory = [];

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const chatForm = document.getElementById('chatForm');
const sendButton = document.getElementById('sendButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
chatForm.addEventListener('submit', handleSendMessage);

// Main chat function
async function handleSendMessage(e) {
    e.preventDefault();

    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    // Add user message to UI
    addMessageToUI(userMessage, 'user');
    messageInput.value = '';

    // Add to message history
    messageHistory.push({
        role: 'user',
        content: userMessage
    });

    // Show loading
    showLoading(true);
    hideError();
    sendButton.disabled = true;

    try {
        // Send to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: messageHistory
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);

        // Extract AI response
        const aiResponse = data.data.choices[0].message.content;

        // Add AI message to UI
        addMessageToUI(aiResponse, 'bot');

        // Add to history
        messageHistory.push({
            role: 'assistant',
            content: aiResponse
        });

    } catch (error) {
        console.error('Error:', error);
        showError(`❌ Fout: ${error.message}`);
        addMessageToUI(`Sorry, er ging iets mis: ${error.message}`, 'bot');
    } finally {
        showLoading(false);
        sendButton.disabled = false;
        messageInput.focus();
    }
}

// Add message to chat UI
function addMessageToUI(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show/hide loading indicator
function showLoading(show) {
    loadingIndicator.style.display = show ? 'flex' : 'none';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Focus input on load
window.addEventListener('load', () => {
    messageInput.focus();
});
