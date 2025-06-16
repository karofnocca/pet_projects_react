import { useState } from "react";
import { addUser } from "./userListSlice";
import { useDispatch } from "react-redux";

function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch({
  //     type: "usersList/addUser",
  //     payload: {
  //       id: Date.now(),
  //       name,
  //       email
  //     }
  //   });
  //   setName("");
  //   setEmail("");
  // };
  const newUser = { id: Date.now(), name, email };

  return (
    <form className="add-user-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          dispatch(addUser(newUser));
          setEmail("");
          setName("");
        }}
      >
        Add User
      </button>
    </form>
  );
}

export default AddUserForm;
