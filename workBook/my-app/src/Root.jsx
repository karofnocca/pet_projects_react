import { useState } from "react";

const Root = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passError, setPassError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (login.trim().length < 8) {
      setError("Login menee 8");
      return;
    } else {
      setError("");
    }

    if (password.trim().length < 8) {
      setPassError("Password menee 8");
      return;
    } else {
      setPassError("");
    }

    alert(`Your login: ${login}, your password: ${password}`);
  }

  function handleLogin(e) {
    const input = e.target.value;
    setLogin(input);
    if (input.trim().length < 8) {
      setError("Login must be more 8 char");
    } else {
      setError("");
    }
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);

    if (value.trim().length < 8) {
      setPassError("Password must be at least 8 characters");
    } else {
      setPassError("");
    }
  }

  return (
    <div >
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={login}
          placeholder="enter your login"
          onChange={handleLogin}
        />
        {error && <p>{error}</p>}
        <input
          type="password"
          value={password}
          placeholder="enter your password"
          onChange={handlePasswordChange}
        />
		{passError && <p>{passError}</p>}
        <button type="submit">
          Submit
        </button>
      </form>
      <p></p>
    </div>
  );
};

export default Root;
