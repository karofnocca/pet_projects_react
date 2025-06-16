import { useState } from "react";
import "./index.css";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <h1 className="title">Universal Modal Component</h1>
      <button className="button" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>

      {isModalOpen && (
        <div className="overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="closeButton" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2 className="modalHeader">Confirm Your Action</h2>
            <div className="modalBody">
              Are you sure you want to proceed? This action cannot be undone.
            </div>
            <div className="modalFooter">
              <button onClick={() => setIsModalOpen(false)} className="secondaryButton">
                Cancel
              </button>
              <button
                className="primaryButton"
                onClick={() => {
                  alert("Ok");
                  setIsModalOpen(false);
                }}
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
