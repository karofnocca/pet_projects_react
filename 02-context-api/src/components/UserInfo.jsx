import UserContext from "../Context/UserContext"
import {useContext} from "react"


const UserInfo = () => {
    const {user, setUser} = useContext(UserContext)
  return (
    <h1>{user}</h1>
  )
}

export default UserInfo