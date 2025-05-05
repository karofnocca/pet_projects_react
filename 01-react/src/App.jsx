import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Contacts from "./Components/Contacts";
import NotFound from "./Components/NotFound";
import MainLayout from "./Layouts/MainLayouts";
import Courses from "./Components/Courses";
import SingleCourses from "./Components/SingleCourses";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:slug" element={<SingleCourses />} />
          <Route path="*" element={<NotFound />} />
          </Route>
          
        </Routes>
      </div> 
    </BrowserRouter>
  );
}


export default App;
