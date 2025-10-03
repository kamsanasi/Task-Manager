import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';


function TopNavbar({cartCount}){

  return(
    <>
    <header className='border-bottom'>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
              <a className="navbar-brand fw-bold" href="#">MyStore</a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link active" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link position-relative" href="#">
                      <FaShoppingCart />
                      {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartCount}
                        </span>
                      )}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/"><FaUser/></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
    </>
  )
}

export default TopNavbar;