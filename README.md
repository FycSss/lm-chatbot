# 🤖 AI Chatbot met LM Studio

Een complete web-based chatbot die communiceert met **LM Studio** (lokale AI server) met **Qwen3.5** model.

## 📋 Inhoud

- [Wat doet dit project?](#wat-doet-dit-project)
- [Hoe werkt het?](#hoe-werkt-het)
- [Installatie](#installatie)
- [Hoe te gebruiken](#hoe-te-gebruiken)
- [Bestandsstructuur](#bestandsstructuur)
- [Uitleg van elke file](#uitleg-van-elke-file)

---

## Wat doet dit project?

Dit project is een **AI chatbot** die:

✅ Een mooi chat interface biedt in je browser
✅ Vragen stuurt naar je lokale LM Studio server
✅ Antwoorden krijgt van het Qwen3.5 AI model
✅ Een chat geschiedenis bijhoudt
✅ Alles veilig doet via een backend server

---

## Hoe werkt het?

```
┌─────────────────────────────────────────────────────────────┐
│                  JOUW BROWSER                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Chat Interface (HTML/CSS/JavaScript)               │ │
│  │  "Hallo, hoe gaat het?" → [Verzenden knop]         │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │ (fetch request naar /api/chat)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         NODE.JS SERVER (localhost:3000)                    │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  server.js                                           │ │
│  │  - Ontvangt je bericht                              │ │
│  │  - Voegt API key toe                               │ │
│  │  - Stuurt naar LM Studio                           │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │ (HTTP request met Authorization header)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│      LM STUDIO SERVER (localhost:1234)                     │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Qwen3.5 9B Model                                   │ │
│  │  - Verwerkt je vraag                               │ │
│  │  - Genereert antwoord                              │ │
│  │  - Stuurt terug als JSON                           │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │ (JSON response)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         NODE.JS SERVER (localhost:3000)                    │
│  - Verwerkt antwoord                                       │
│  - Stuurt terug naar browser                              │
└────────────────────┬─────────────────────────────────────────┘
                     │ (JSON response)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  JOUW BROWSER                              │
│  - Toont AI antwoord in chat                              │
│  - "Hier is mijn antwoord..."                            │
└─────────────────────────────────────────────────────────────┘
```

### Waarom een backend server?

**Zonder backend** (slecht ❌):
- Je API key zou **zichtbaar zijn** in de browser (ONVEILIG!)
- Iedereen kan je API key stelen
- Iedereen kan je LM Studio misbruiken

**Met backend** (goed ✅):
- Je API key staat **veilig op de server**
- Browser stuurt alleen naar je eigen server
- Server beschermt de API key
- LM Studio is beveiligd

---

## Installatie

### Stap 1: Clone de repository

```bash
git clone https://github.com/FycSss/lm-chatbot.git
cd lm-chatbot
```

### Stap 2: Installeer dependencies

```bash
npm install
```

Dit installeert:
- **Express** - Web framework
- **Axios** - HTTP client
- **Dotenv** - Environment variables
- **Cors** - Cross-Origin requests

### Stap 3: Controleer .env bestand

Open `.env` en controleer of alles klopt:

```
LM_STUDIO_URL=http://localhost:1234
LM_STUDIO_API_KEY=sk-lm-PAn3axWn:S7RrhZ2WbraqV7ZL9lZl
LM_STUDIO_MODEL=qwen/qwen3.5-9b
PORT=3000
```

### Stap 4: Start LM Studio

Zorg dat je **LM Studio** draait op `localhost:1234` met het **Qwen3.5 model geladen**.

Je ziet dat het model klaar is in LM Studio's interface.

### Stap 5: Start de Node.js server

```bash
npm start
```

Je krijgt:
```
🚀 Server started on http://localhost:3000
📡 Connected to LM Studio at http://localhost:1234
🤖 Using model: qwen/qwen3.5-9b
```

### Stap 6: Open in browser

Ga naar: http://localhost:3000

✅ Je ziet je chatbot interface!

---

## Hoe te gebruiken

1. **Type een bericht** in het input veld
2. **Druk op Verzenden** of Enter
3. **Wacht** op het antwoord (loading indicator verschijnt)
4. **Lees** het AI antwoord
5. **Ga door** met het volgende bericht

### Voorbeelden van vragen:

- "Wat is Python?"
- "Leg uit hoe neurale netwerken werken"
- "Schrijf een JavaScript function"
- "Wat is machine learning?"

---

## Bestandsstructuur

```
lm-chatbot/
├── server.js              # Node.js backend server
├── package.json           # Dependencies lijst
├── .env                   # Geheime configuratie
├── .gitignore            # Welke bestanden niet in Git
├── README.md             # Dit bestand
└── public/               # Frontend bestanden
    ├── index.html        # HTML pagina
    ├── style.css         # Styling
    └── script.js         # Frontend JavaScript
```

---

## Uitleg van elke file

### 📦 `package.json`

```json
{
  "name": "lm-chatbot",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  }
}
```

**Wat doet het:**
- **name**: Naam van het project
- **main**: Welk bestand moet draaien
- **scripts**: Commando's (`npm start`, `npm run dev`)
- **dependencies**: Benodigde packages

### 🔐 `.env`

```
LM_STUDIO_URL=http://localhost:1234
LM_STUDIO_API_KEY=sk-lm-PAn3axWn:S7RrhZ2WbraqV7ZL9lZl
LM_STUDIO_MODEL=qwen/qwen3.5-9b
PORT=3000
NODE_ENV=development
```

**Wat doet het:**
- Geheime instellingen die je niet in Git wilt
- `dotenv` laadt deze in `process.env`
- In server.js: `process.env.LM_STUDIO_API_KEY`

**⚠️ BELANGRIJK:**
- `.env` staat in `.gitignore` (niet in Git!)
- Deel je API key NOOIT
- In productie: zet dit in secrets op server

### 🖥️ `server.js` - De backend

```javascript
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());        // JSON requests accepteren
app.use(express.static('public')); // Statische files serveren

// API endpoint
app.post('/api/chat', async (req, res) => {
  // Hier gebeurt de magie!
});

app.listen(3000);
```

**Stap voor stap:**

1. **Imports**: Express, Axios, dotenv
2. **Express app maken**: `const app = express()`
3. **Middleware toevoegen**:
   - `express.json()` → kan JSON lezen
   - `express.static('public')` → serveert HTML/CSS/JS
4. **POST endpoint**: `/api/chat`
   - Ontvangt berichten van browser
   - Voegt API key toe
   - Roept LM Studio aan
   - Stuurt antwoord terug
5. **Server starten**: `app.listen(3000)`

**De /api/chat endpoint gedetailleerd:**

```javascript
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;  // Ontvang berichten

    // Call LM Studio API
    const response = await axios.post(
      `${LM_STUDIO_URL}/api/v1/chat`,
      {
        model: LM_STUDIO_MODEL,
        messages: messages,          // Stuur berichten
        temperature: 0.7,            // Hoe "creatief" (0-1)
        max_tokens: 1000             // Max lengte antwoord
      },
      {
        headers: {
          'Authorization': `Bearer ${LM_STUDIO_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Wat gebeurt hier:**
1. Browser stuurt: `{ messages: [{role: 'user', content: 'Hallo'}] }`
2. Server ontvangt `req.body`
3. Server maakt Axios request naar LM Studio
4. **Voegt API key toe in Authorization header**
5. LM Studio verwerkt vraag
6. Server ontvangt antwoord
7. Server stuurt terug naar browser

### 📄 `public/index.html` - De UI

```html
<!DOCTYPE html>
<html>
<head>
    <title>AI Chatbot - LM Studio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="chat-header">
            <h1>🤖 AI Chatbot</h1>
        </div>

        <div class="chat-messages" id="chatMessages">
            <!-- Berichten verschijnen hier -->
        </div>

        <form id="chatForm">
            <input id="messageInput" type="text" placeholder="Typ een bericht...">
            <button type="submit">Verzenden</button>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**Elementen:**
- **Header**: Titel en beschrijving
- **chat-messages**: Container voor berichten
- **chatForm**: Input veld + Verzenden knop
- **script.js**: JavaScript die het laat werken

### 🎨 `public/style.css` - De styling

Maakt de chatbot mooi met:
- **Gradient achtergrond** (paars)
- **Chat bubble stijl** (blauw = user, wit = bot)
- **Responsive design** (werkt op mobiel)
- **Animations** (berichten glijden in)
- **Hover effecten** (knoppen veranderen)

### ⚙️ `public/script.js` - De frontend logica

```javascript
// 1. User typt bericht en drukt Verzenden
chatForm.addEventListener('submit', handleSendMessage);

// 2. Bericht verschijnt in UI
addMessageToUI(userMessage, 'user');

// 3. Fetch request naar backend
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages: messageHistory })
});

// 4. Backend stuurt antwoord terug
const data = await response.json();

// 5. AI antwoord verschijnt in UI
addMessageToUI(aiResponse, 'bot');

// 6. Chat geschiedenis bijhouden
messageHistory.push({ role: 'assistant', content: aiResponse });
```

**Stap voor stap:**

1. **Event listener**: Wacht op submit (Verzenden)
2. **User message**: Toon in chat als blauw bubble
3. **Verzend naar server**: `fetch('/api/chat')`
4. **Wacht op antwoord**: `await response.json()`
5. **Bot message**: Toon in chat als wit bubble
6. **Onthoud**: Voeg toe aan `messageHistory`

**Chat history:**

```javascript
messageHistory = [
  { role: 'user', content: 'Hallo' },
  { role: 'assistant', content: 'Hallo! Hoe kan ik helpen?' },
  { role: 'user', content: 'Wat is AI?' },
  { role: 'assistant', content: 'AI is kunstmatige intelligentie...' }
]
```

Dit stuurt je server elke keer, zodat de AI het hele gesprek kent!

---

## Troubleshooting

### ❌ "Cannot connect to LM Studio"

**Oorzaak**: LM Studio draait niet op `localhost:1234`

**Oplossing**:
1. Open LM Studio
2. Load het Qwen3.5 model
3. Start de server (groene knop)
4. Controleer: http://localhost:1234/health

### ❌ "Invalid API key"

**Oorzaak**: De API key in `.env` is fout

**Oplossing**:
1. Open LM Studio → Server Settings
2. Kopier je API key
3. Update `.env` bestand
4. Restart de Node.js server: `npm start`

### ❌ "Port 3000 already in use"

**Oorzaak**: Iets anders draait al op poort 3000

**Oplossing**:

Optie 1: Kill het proces:
```bash
# Op Mac/Linux:
kill -9 $(lsof -t -i :3000)

# Op Windows (PowerShell):
Stop-Process -Port 3000
```

Optie 2: Verander de poort in `.env`:
```
PORT=3001
```

### ❌ "npm: command not found"

**Oorzaak**: Node.js niet geïnstalleerd

**Oplossing**:
1. Download Node.js: https://nodejs.org/
2. Installeer
3. Controleer: `node --version` en `npm --version`

---

## Development Mode

Voor development met auto-reload:

```bash
npm run dev
```

Dit gebruikt `nodemon` die server automatisch herstart als je bestanden wijzigt.

---

## Wat je kan aanpassen

### Verander de model parameters in `server.js`:

```javascript
const response = await axios.post(`${LM_STUDIO_URL}/api/v1/chat`, {
  model: LM_STUDIO_MODEL,
  messages: messages,
  temperature: 0.7,      // 0 = neutraal, 1 = creatief
  max_tokens: 1000,      // Hoe lang mag antwoord zijn
  top_p: 0.95            // Nucleus sampling
});
```

### Verander de stijl in `public/style.css`:
- Kleuren
- Fonts
- Layout
- Animations

### Voeg meer functies toe in `public/script.js`:
- Chat opslaan
- Chat verwijderen
- Tekstsize aanpassen
- Dark mode

---

## Volgende stappen

💡 Ideeën om uit te breiden:

1. **Chat history opslaan** in LocalStorage of database
2. **Meerdere modellen** selecteren
3. **Voice input/output** (speech recognition)
4. **Markdown rendering** in antwoorden
5. **Copy-to-clipboard** knop
6. **Dark theme** toggle
7. **Typing indicator** animatie
8. **Emoji picker**
9. **Image upload** support
10. **Deploy** op internet (Heroku, Vercel, etc.)

---

## Licentie

MIT License

---

## Vragen?

Check de `server.js` en `script.js` bestanden - ze hebben gedetailleerde comments! 💬

Veel plezier met je chatbot! 🚀
