require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;



// Twilio credentials (replace with yours)
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_token;
const client = twilio(accountSid, authToken);
const myNumber = process.env.MY_WHATSAPP_NUMBER;

// This will store all messages for the web UI
let chatHistory = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serves frontend files (index.html, app.js)

app.post('/webhook', (req, res) => {
    //request from Twilio when a new WhatsApp message is received
    console.log('📥 Incoming message from WhatsApp');
    const userMsg = req.body.Body?.trim();
    const userNum = req.body.From;

    if (!userMsg) return res.sendStatus(400);

    // Save user message to UI history
    chatHistory.push({ from: 'user', text: userMsg });
    console.log("DATA STORED SUCCESSFULLY")

    // Run Python AI script
    console.log('🤖 Running AI script...');
    const py = spawn('python', ['ai_bot.py']);
    let aiReply = '';

    py.stdin.write(userMsg + '\n');
    py.stdin.end();

    py.stdout.on('data', chunk => {
        aiReply += chunk.toString();
    });

    py.on('close', () => {
        aiReply = aiReply.trim();
        chatHistory.push({ from: 'bot', text: aiReply });

        // Send reply back to WhatsApp via Twilio
        client.messages
            .create({
                from: 'whatsapp:+14155238886', // Twilio sandbox number
                to: myNumber, // Your WhatsApp number
                body: aiReply
            })
            .then(() => console.log('✅ Reply sent to WhatsApp'))
            .catch(err => console.error('❌ Error sending reply:', err));

        // Tell Twilio it's done
        res.status(200).send('OK');
    });
});

// Serve chat history to frontend
app.get('/chat', (req, res) => {
    console.log("Request for chat history received");
    // Return the chat history as JSON
    res.json(chatHistory);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
