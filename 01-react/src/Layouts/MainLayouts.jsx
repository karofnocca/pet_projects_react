import { Outlet } from "react-router-dom"
import Menu from "../Components/Menu"

const MainLayout = () => {
  return (
    <>
    <Menu/>
    <Outlet/>
    </>
  )
}

export default MainLayout