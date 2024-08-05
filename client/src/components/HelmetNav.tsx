import { Helmet } from 'react-helmet-async';
import '../assets/BootswatchTheme.css';
import favicon from '../assets/arm-8500.svg';
import { Outlet, Link } from 'react-router-dom';

const HelmetNav = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>LiftingLog</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>

            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                <a className="navbar-brand">[LiftingLog]</a>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/calendar">Calendar</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

            <Outlet/>
        </>
    )
}

export default HelmetNav;