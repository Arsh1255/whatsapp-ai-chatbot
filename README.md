# WhatsApp AI Chatbot 🤖📱

A chatbot that receives WhatsApp messages via Twilio Sandbox, processes them using an AI model (OpenRouter API with a Python fallback), and replies through Twilio.

## 💡 Technologies Used
- Node.js + Express
- Python + TextBlob + SymPy
- Twilio WhatsApp API
- OpenRouter AI
- HTML + CSS + JS (Frontend)

## 🚀 How to Run
1. Install dependencies:
   - `npm install`
   - `pip install -r requirements.txt`

2. Run:
   - `node server.js`
   - `ngrok http 3000`

3. Connect Twilio sandbox to your ngrok URL.i,e set the post url as your ngrokURL/webhook on twilio sandbox and scan the qr or enter code manually to connect your whatsapp to twilio chat.

4. Send a WhatsApp message to your Twilio sandbox number and see the AI reply!

5.Also you can see dynamic conversation of you and your ai on the ngrok url

## 📁 Folder Structure
whatsapp_bot/
├── server.js
├── ai_bot.py
├── public/
│ ├── index.html
│ ├── style.css
│ ├── app.js
└── ...
