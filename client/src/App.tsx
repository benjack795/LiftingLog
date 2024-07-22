import "./assets/BootswatchTheme.css";
import HelmetNav from './components/HelmetNav';
import HomeInfo from './components/HomeInfo';
import Calendar from './components/Calendar';
import Stats from './components/Stats';
import { BrowserRouter,  Routes,  Route} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelmetNav />}>
          <Route index element={<HomeInfo />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
