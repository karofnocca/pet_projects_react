import { useState } from "react";
import UserContext from "./Context/UserContext";
import "./App.css";
import User from "./components/User";
import ChangeUser from "./components/ChangeUser";

function App() {
  const [user, setUser] = useState("Maksim");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <User />
        <ChangeUser />
      </div>
    </UserContext.Provider>
  );
}

export default App;
