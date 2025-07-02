const initState = {
  selectedUserId: null,
};

export default function userDetailReducer(state = initState, action) {
  switch (action.type) {
    case "userDetail/selectUser":
      return {
        ...state,
        selectedUserId: action.payload,
      };
    case "userDetail/clearSelecte .User": {
      return {
        ...state,
        selectedUserId: null,
      };
    }
    default: {
      return state;
    }
  }
}

export function selectUsers(userId) {
  return { type: "userDetail/selectUser", payload: userId };
}

export function clearSelectUsers() {
  return { type: "userDetail/clearSelectUser" };
}
