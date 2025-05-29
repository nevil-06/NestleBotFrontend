# Nestlé Chatbot Frontend 🤖🍫

A responsive and interactive **React + Vite** web interface for querying Nestlé's intelligent assistant. Connects seamlessly with the FastAPI backend for real-time product and recipe recommendations using RAG and Graph-based retrieval.

---

## 🌐 Live Frontend

* **Hosted URL:**
  `https://<your-frontend-app>.azurestaticapps.net`

* **Backend API Endpoint:**
  `https://<your-backend-app>.azurewebsites.net/answer`

---

## 📂 Project Structure

```bash
MY-APP/
├── src/
│   ├── assets/                   # Images, logos
│   ├── components/
│   │   ├── ChatbotUI.jsx         # Chatbot interface
│   │   └── ChatbotUI.css         # Chatbot styles
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # App mount + Vite entry
│   ├── App.css, index.css        # Global styles
├── public/
│   └── index.html                # HTML template
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite config
├── .gitignore
└── README.md
```

---

## 🪀 Features

* ✨ Modern React + Vite setup
* 💬 Chat-like interface for queries
* ⚡ Fast interaction with FastAPI backend
* ☁️ Azure Static Web App compatible

---

## 🧪 Getting Started (Local)

### 1. Install dependencies

```bash
yarn install
# or
npm install
```

### 2. Set API Endpoint

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://<your-backend-app>.azurewebsites.net
```

### 3. Run Dev Server

```bash
yarn dev
# or
npm run dev
```

Visit `http://localhost:5173`

---

## ⚖️ API Connection Logic

In `ChatbotUI.jsx` or `App.jsx`, your fetch should use the base URL:

```js
const baseUrl = import.meta.env.VITE_API_BASE_URL;
fetch(`${baseUrl}/answer`, {
  method: "POST",
  body: JSON.stringify({ query: userInput }),
  headers: { "Content-Type": "application/json" }
})
```

Ensure the backend has CORS configured to allow:

```python
allow_origins=["http://localhost:5173", "https://<frontend>.azurestaticapps.net"]
```

---

## ☁️ Deployment (Azure Static Web Apps)

### 1. Build

```bash
yarn build
# or
npm run build
```

### 2. Deploy to Azure

Use **Azure Static Web App** via:

* GitHub Actions (auto CI/CD)
* Azure Portal upload
* VS Code Azure Extension

Set build output folder to:

```
dist/
```

---

## 🚫 Troubleshooting

| Issue         | Fix                                             |
| ------------- | ----------------------------------------------- |
| 404 on fetch  | Check base URL in `.env` is correct             |
| CORS error    | Backend must allow your frontend domain         |
| Blank chatbot | Open DevTools → Network tab → inspect `/answer` |

---

## 📚 License

MIT License © 2025 Nestlé AI Team
