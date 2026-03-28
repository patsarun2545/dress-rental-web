import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="nav-link" data-widget="pushmenu" role="button">
              <i class="fas fa-bars"></i>
            </Link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <Link to="nav-link" data-widget="fullscreen" role="button">
              <i class="fas fa-expand-arrows-alt"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
