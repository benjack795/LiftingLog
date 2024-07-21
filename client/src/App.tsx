import "./assets/BootswatchTheme.css";
import HelmetNav from './components/HelmetNav';
import HomeInfo from './components/HomeInfo';
import Calendar from './components/Calendar';
import Stats from './components/Stats';
import { BrowserRouter,  Routes,  Route} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:5000')
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelmetNav />}>
          <Route index element={<HomeInfo />} />
          <Route path="calendar" element={<div><Calendar /><h1>{message}</h1></div>} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
