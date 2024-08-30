import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

function NavBar() {
  const location = useLocation();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg position-sticky top-0 z-3"
        data-bs-theme="dark"
        style={{ backgroundColor: "#1A4899" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="Ilmeteo_logo.png"
              style={{ width: "50px", height: "50px" }}
              alt="Logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active fw-bold" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="#">
                  Previsioni
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="#">
                  Regioni
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="/profile">
                  Notizie
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="/settings">
                  Info
                </a>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <Link className="navbar-brand" to="/search">
                <i className="bi bi-search icons"></i>
              </Link>
              {location.pathname === "/" && (
                <div id="kids" className="fw-bold me-3">
                  
                </div>
              )}
              <div id="profile" className="fw-bold">
              <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
              </div>
              <i className="bi bi-bell icons"></i>
              <i className="bi bi-person-circle icons"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
