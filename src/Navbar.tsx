const Navbar = () => {
    return (
        <nav id='navbar'>
            <a href='/'>
                <img id='logo' src='/nightlight-logo.svg' alt='nightlight logo' />
            </a>
            <div className='links-container'>
                <a className='link' href='/'>Home</a>
                <a className='link' href='/support'>Support</a>
            </div>
        </nav>
    );
};

export default Navbar;
