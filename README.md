# 📱 WhatsApp AI Chatbot

A WhatsApp chatbot that uses **Twilio Sandbox** to receive messages, processes them using the **OpenRouter AI API** (with a Python **TextBlob/SymPy** fallback), and replies in real time.

## 🚀 Features
- Receive and reply to WhatsApp messages instantly.
- AI responses via OpenRouter API.
- Python fallback AI for offline/basic replies.
- Web interface to view live conversations.
- Runs locally with `ngrok` tunneling.

## 📂 Project Structure
```
whatsapp-ai-chatbot/
├── ai_bot.py         # Python AI fallback logic
├── server.js         # Node.js Express + Twilio webhook
├── public/           # Frontend (HTML, CSS, JS)
├── package.json
├── requirements.txt
├── .env.example      # Example environment variables
└── README.md
```

## 🛠 Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [Python](https://www.python.org/) 3.8+
- [ngrok](https://ngrok.com/) account (free)
- Twilio account (free tier)
- OpenRouter account (free tier)

---

## 1️⃣ Create Accounts & Get API Keys

### A. Twilio (WhatsApp Sandbox)
1. Go to [Twilio Sign Up](https://www.twilio.com/try-twilio) and create an account.
2. Verify your email and phone number.
3. In the Twilio Console, navigate to: **Messaging → Try it out → Send a WhatsApp message**.
4. **Join the Sandbox**: send the given join code from your WhatsApp to Twilio’s sandbox number (`+14155238886`), or scan the QR code provided.
5. Go to: **Console → Account Info** and copy:
   - **Account SID** (e.g., `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - **Auth Token** (e.g., `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### B. OpenRouter API
1. Visit [OpenRouter Sign Up](https://openrouter.ai/signup) and create an account.
2. Go to the [API Keys page](https://openrouter.ai/keys).
3. Click **Create API Key** and copy it (starts with `or-`).

---

## 2️⃣ Environment Variables

You can store secrets in a `.env` file or set them system-wide(recommended).

### `.env` file 
Create a `.env` file in the project root:
```env
PORT=3000
TWILIO_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MY_WHATSAPP_NUMBER=whatsapp:+91xxxxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
API_KEY=or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Permanent (recommended)**:
```cmd
setx PORT "3000"
setx TWILIO_SID "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
setx TWILIO_token "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
setx MY_WHATSAPP_NUMBER "whatsapp:+91xxxxxxxxxx"
setx API_KEY "or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 3️⃣ Installation
```bash
git clone https://github.com/Arsh1255/whatsapp-ai-chatbot.git
cd whatsapp-ai-chatbot
```

**Install Node dependencies:**
```bash
npm install
```

**Install Python dependencies:**
```bash
python -m venv venv
venv\Scripts\activate    # On Windows
pip install -r requirements.txt
```

---

## 4️⃣ Running the Bot
**Start Node server:**
```bash
node server.js
```

**Expose to the internet with ngrok(in another terminal window):**
```bash
ngrok http 3000
```
You’ll get a URL like: `https://abc123.ngrok.io`

---

## 5️⃣ Configure Twilio Webhook
In the Twilio Console:
- Go to **Messaging → Try it out → Send a WhatsApp message → Sandbox Configuration**.
- Find **When a message comes in** and paste:
```
https://abc123.ngrok.io/webhook
```

---

## 6️⃣ Testing
From your WhatsApp, send any message to the Twilio Sandbox number you joined earlier.  
You should receive an AI-generated reply in seconds.

> **Note:** Once the Twilio Sandbox message limit is reached, you can still send messages to the Sandbox but won’t receive replies on WhatsApp. However, you can still view the full conversation (both yours and the AI’s replies) by visiting your **public ngrok URL** in a browser — the page will *dynamically update* with new messages.

---

## 🛠 Troubleshooting
- **401 Unauthorized from Twilio** → Check `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`.
- **No reply** → Ensure ngrok is running and the webhook URL matches the current ngrok address.
- **Python fallback not working** → Check `ai_bot.py` logs and ensure Python is installed.

---

## 📜 License
MIT License — see `LICENSE`.

---

## 🤝 Contributing
Pull requests are welcome!  
Fork → Make changes → Submit PR.

---

## 📌 Useful Links
- [Twilio Sign Up](https://www.twilio.com/try-twilio)  
- [Twilio Console](https://www.twilio.com/console)  
- [OpenRouter Sign Up](https://openrouter.ai/signup)  
- [ngrok](https://ngrok.com/)

---

## 📄 Detailed Setup Guide
For the full step-by-step guide (with images), see the PDF:  
[Download WhatsApp AI Chatbot Setup Guide](public/CHATBOT_GUIDE.pdf)
