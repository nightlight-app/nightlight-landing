import './Navbar.css';

const Navbar = () => {
    return (
        <nav id='navbar'>
            <a id='logo-container' href='/'>
                <img id='logo' src='/nightlight-logo.svg' alt='nightlight logo' />
            </a>
            <ul className='links-container'>
                <li>
                    <a className='link' href='/support'>Support</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
