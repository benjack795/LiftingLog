import "./assets/BootswatchTheme.css";
import HomeInfo from './components/HomeInfo';
import {Helmet} from "react-helmet";
import favicon from './assets/dumbbell-solid.svg'

function App() {
  return (
    <div className='App'>

        <Helmet>
            <meta charSet="utf-8" />
            <title>LiftingLog</title>
            <link rel="icon" type="image/x-icon" href={favicon} />
        </Helmet>

        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">LiftingLog (Home)</a>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Calendar</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#">Stats</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <br/><br/>
        <HomeInfo />

    </div>
  )
}

export default App
