import UserContext from "../Context/UserContext"
import { useContext } from "react"



const ChangeUser = () => {
  const {user, setUser} = useContext(UserContext)
  return (
    <button onClick={() => {
        setUser(user === "Maksim" ? "Alice" : "Maksim")
    }}>Change user</button>
  )
}

export default ChangeUser