import { useReducer } from "react";
import "./index.css";

const initState = { date: new Date(), inputValue: "" };

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return { ...state, date: new Date() };
    case "updateInput" :
      return {...state, inputValue: action.payload}
    case "updateDate":
      const days = parseInt(state.inputValue, 10)
      if (isNaN(days)) return state
      
      const updatedDate = new Date(state.date)
      updatedDate.setDate(updatedDate.getDate()+days)
      return {...state, date: updatedDate, inputValue: ""}
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div className="app-container">
      <p className="date-text">{state.date.toDateString()}</p>

      <button className="btn" onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>

      <div className="input-group">
        <input
          className="input"
          type="number"
          value={state.inputValue}
          placeholder="Days after today"
          onChange={(e) => dispatch({type: "updateInput", payload: e.target.value})}
        />
        <button className="btn primary-btn" onClick={() => dispatch({type: "updateDate"})}>Show result</button>
      </div>
    </div>
  );
}

export default App;
