import {Link, Outlet} from 'react-router-dom'

import './NavHeader.css'

export default function NavHeader () {
  return(
    <div className="header-container">
      <span>
        Speculum Mundi
      </span>
      <nav className="navigation-panel">
        <Link to="/">
          <button className="navigation-button">
            Home
          </button>
        </Link>
        <Link to="/timeline">
          <button className="navigation-button">
            Timeline
          </button>
        </Link>
        <Link to="/map">
          <button className="navigation-button">
            Map
          </button>
        </Link>
        <Link to="/discussions">
          <button className="navigation-button">
            Discussions
          </button>
        </Link>
        <Link to="/contact">
          <button className="navigation-button">
            Contact
          </button>
        </Link>
      </nav>
      <Outlet />
    </div>
  )
}