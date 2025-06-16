import { useEffect, useReducer } from "react";

const initState = {
  candidates: [],
  newCandidate: "",
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "vote_app":
      return incrementVote(state, action.payload);
    case "vote_down": 
      return dicrementVote(state, action.payload)
    case "addCandidate":
      if (
        !action.payload.trim() ||
        state.candidates.some((candidate) => candidate.name === action.payload)
      )
        return state;
      return {
        ...state,
        candidates: [...state.candidates, { name: action.payload, votes: 0 }],
        newCandidate: "",
      };
    case "reset_votes":
      return {
        ...state,
        candidates: state.candidates.map((candidate) => ({
          ...candidate,
          votes: 0,
        })),
      };
    case "updateNewCandidate":
      return {
        ...state,
        newCandidate: action.payload,
      };
    case "dataReceived":
      return {
        ...state,
        candidates: action.payload,
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
    candidates: state.candidates.map((candidate) => {
      return candidate.name === name
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate;
    }),
  };
}

function dicrementVote(state, name) {
   return {
    ...state,
    candidates: state.candidates.map((candidate) => {
      return candidate.name === name
        ? { ...candidate, votes: Math.max(candidate.votes - 1, 0) }
        : candidate;
    }),
  };
}

function VoteTracker() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:9000/candidates");
        if (!res.ok) {
          throw new Error("failed to fatch");
        }
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFaild" });
      }
    }
    fetchData();
  }, []);

  if (state.status === "loading") {
    return <p>Loadind data, wait...</p>;
  }

  if (state.status === "error") {
    return <p>Failed to fatch</p>;
  }

  return (
    <>
      <h1>Vote Tracker</h1>
      <ul>
        {state.candidates.map((candidate) => {
          return (
            <li key={candidate.id}>
              {candidate.name}: {candidate.votes} votes
              <button
                onClick={() =>
                  dispatch({ type: "vote_app", payload: candidate.name })
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "vote_down", payload: candidate.name })
                }
              >
                -
              </button>
            </li>
          );
        })}
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
            dispatch({ type: "updateNewCandidate", payload: e.target.value })
          }
        />
        <button
          onClick={() =>
            dispatch({ type: "addCandidate", payload: state.newCandidate })
          }
        >
          Add
        </button>
      </div>
    </>
  );
}

export default VoteTracker;