import { act, useEffect, useReducer } from "react";

const initState = {
  candidate: [],
  newCandidate: "",
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "voteUp":
      return incrementVote(state, action.payload);
    case "voteDown":
      return decrementVote(state, action.payload);
    case "reset_votes":
      return {
        ...state,
        candidate: state.candidate.map((can) => ({ ...can, votes: 0 })),
      };
    case "addCandidateInArr":
      if (
        !action.payload.trim() ||
        state.candidate.some((can) => can.name === action.payload)
      )
        return state;
      return {
        ...state,
        candidate: [...state.candidate, { name: action.payload, votes: 0 }],
        newCandidate: "",
      };
    case "addCandidate":
      return {
        ...state,
        newCandidate: action.payload,
      };
    case "dataReceived":
      return {
        ...state,
        candidate: action.payload,
        status: "ready",
      };
    case "dataFaild":
      return {
        ...state,
        status: "error",
      };
  }
}

function incrementVote(state, name) {
  return {
    ...state,
    candidate: state.candidate.map((can) =>
      can.name === name ? { ...can, votes: can.votes + 1 } : can
    ),
  };
}

function decrementVote(state, name) {
  
  return {
    ...state,
    candidate: state.candidate.map((can) =>
      can.name === name ? { ...can, votes: Math.max(can.votes - 1, 0) } : can
    ),
  };
}

function VoteTracker() {
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:9000/candidates");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFaild" });
      }
    }
    fetchData();
  }, []);

  if (state.status === "loading") {
    return <p>Loading data...</p>;
  }

  if (state.status === "error") {
    return <p>Faild to data</p>;
  }

  return (
    <>
      <h1>Vote Tracker</h1>
      <ul>
        {state.candidate.map((can) => (
          <li key={can.name}>
            {can.name}: {can.votes} votes
            <button
              onClick={() => dispatch({ type: "voteUp", payload: can.name })}
            >
              +
            </button>
            <button
              onClick={() => dispatch({ type: "voteDown", payload: can.name })}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "reset_votes" })}>
        Reset Votes
      </button>

      <div>
        <h2>Add Candidate</h2>
        <input
          type="text"
          placeholder="Candidate name"
          value={state.newCandidate}
          onChange={(e) =>
            dispatch({ type: "addCandidate", payload: e.target.value })
          }
        />
        <button
          onClick={() =>
            dispatch({ type: "addCandidateInArr", payload: state.newCandidate })
          }
        >
          Add
        </button>
      </div>
    </>
  );
}

export default VoteTracker;
