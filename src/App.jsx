import "./App.css";
import ChatbotUI from "./components/Chatbot/ChatbotUI";


function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <img
              src="/images/image.png"
              alt="Nestlé Logo"
              className="nestle-logo"
            />
            <h1 className="logo-text">Nestlé Assitant</h1>
          </div>
          <nav className="main-nav">
            <ul className="nav-list">
              <li>
                <a href="#" className="nav-link active">
                  Home
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Your One-Stop Nestlé products ChatBot</h1>
              <p>
                Discover Brands, Products, Recipes and additional information
                about Nestle´.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="container about-content">
            <div className="about-text">
              <h2>About the Project</h2>
              <h3>AI-powered Product & Recipe Assistant</h3>
              <p>
                This interactive chatbot leverages Retrieval-Augmented
                Generation (RAG) with FAISS and GraphRAG to help users discover
                Nestlé products and recipes. It supports natural language
                queries, ingredient-based matching, and hybrid context-aware
                recommendations.
              </p>
              <p>
                Built using React, FastAPI, Neo4j, and OpenAI, it demonstrates
                how modern LLMs can power meaningful interactions in e-commerce
                and knowledge retrieval scenarios.
              </p>
            </div>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Nestle Assistant Bot
          </div>
          {/* </footer> */}
        </section>
      </main>

      {/* Chatbot component */}
      <ChatbotUI />
    </div>
  );
}

export default App;
