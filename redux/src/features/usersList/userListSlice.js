const initState = {
  users: [],
  loading: false,
  error: null,
};

function userListReducer(state = initState, action) {
  switch (action.type) {
    case "usersList/addUser":
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: Date.now(),
            name: action.payload.name,
            email: action.payload.email,
          },
        ],
      };

    case "usersList/fetchData":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "usersList/fetchSuccess":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "usersList/fetchError":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "usersList/deleteUser":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
}

export function fetchData() {
  return async function (dispatch) {
    dispatch({ type: "usersList/fetchData" });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      dispatch({ type: "usersList/fetchSuccess", payload: data });
    } catch (err) {
      dispatch({ type: "usersList/fetchError", payload: err.message });
    }
  };
}

export function addUser(userData) {
  return { type: "usersList/addUser", payload: userData };
}

export function deleteUser(id) {
  return { type: "usersList/deleteUser", payload: id };
}
export default userListReducer;
