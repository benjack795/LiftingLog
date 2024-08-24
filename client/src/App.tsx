import "./assets/BootswatchTheme.css";
import HelmetNav from './components/HelmetNav';
import HomeInfo from './components/HomeInfo';
import Calendar from './components/Calendar';
import { BrowserRouter,  Routes,  Route} from "react-router-dom";

function App() {

  //highest level app conmponent uses react router to route to each of the two pages via the navbar (and the default index)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelmetNav />}>
          <Route index element={<HomeInfo />} />
          <Route path="index" element={<HomeInfo />} />
          <Route path="calendar" element={<Calendar/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
