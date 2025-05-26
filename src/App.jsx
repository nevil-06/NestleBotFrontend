import "./App.css";
import ChatbotUI from "./components/Chatbot/ChatbotUI";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <svg
              className="coffee-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" />
            </svg>
            <h1 className="logo-text">Café Nestle</h1>
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
              <h1>Awaken Your Senses With Every Sip</h1>
              <p>
                Discover hand-roasted blends from sustainable farms across the
                globe.
              </p>
              <button className="primary-button">Shop Our Roasts</button>
              <div className="ratings">
                <div className="avatar-group">
                  <div className="avatar">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Avatar"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Avatar"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Avatar"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="Avatar"
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src="https://randomuser.me/api/portraits/women/53.jpg"
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div className="stars">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="rating-number">(1,000+ reviews)</span>
                </div>
              </div>
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
          {/* <section className="experience-section">
          <div className="container">
            <div className="experience-content">
              <h3>Want to experience the quality and care behind every cup?</h3>
              <button className="accent-button">Shop Now</button>
            </div>
          </div>
        </section> */}
        {/* <footer className="footer"> */}
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
