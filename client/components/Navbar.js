import Link from 'next/link'

const navbg = {
    // backgroundColor: '#e3f2fd',
};

const NavBar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="container">
            <Link href="/">
                <a className="navbar-brand" href="#">NextJS + Laravel</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav"/>
            <span className="navbar-text">
                <ul className="navbar-nav">
                    <Link className="nav-link" href="/authors">
                        <a className="nav-link"> Authors </a>
                    </Link>
                    <Link className="nav-link" href="/books">
                        <a className="nav-link"> Books </a>
                    </Link>
                </ul>   
            </span>
        </span>
    </nav>
);
  
export default NavBar;
