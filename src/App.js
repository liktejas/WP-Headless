import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home';
import Blogs from './Blogs';
import Single from './Single';
import About from './About';
import Contact from './Contact';
import Error from './Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="single/:id" element={<Single />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
