// React
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';
// Actions
import { shouldShowLogin } from '../store/system.action';
import { onLogout } from '../store/auth.action';
// Cmps
import { SavePublishBtns } from '../pages/editor-page/cmps/SavePublishBtns';
import { MobileHamburger } from './MobileHamburger';
// Assets
import { IoIosLogIn } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import logo from '../../assets/webzone/webzone-full-logo-small.png'


export function AppHeader() {

    const dispatch = useDispatch();
    const location = useLocation();

    const user = useSelector(state => state.userModule.user);

    const [headerClass, setHeaderClass] = useState('');
    const [scrollHeaderClass, setScrollHeaderClass] = useState('');
    const [placeholderClass, setPlaceholderClass] = useState('');

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])


    useEffect(() => {
        // HomePage :
        if (location.pathname === '/') {
            setHeaderClass('');
            setPlaceholderClass('hidden');
        }

        // PublishPage :
        else if (location.pathname.includes('/publish')) {
            setHeaderClass('hidden');
            setPlaceholderClass('hidden');
        }

        // EditorPage :
        else if (location.pathname.includes('/editor')) {
            setHeaderClass('minimized in-editor');
            setPlaceholderClass('minimized');
        }

        else {
            setHeaderClass('');
            setPlaceholderClass('');
        }

    }, [location])


    const handleScroll = () => {
        if (window.scrollY < 50) setScrollHeaderClass('');
        if (window.scrollY > 50) setScrollHeaderClass('active-scroll-1');
        if (window.scrollY > 750) setScrollHeaderClass('active-scroll-2');
    }


    return <>

        <header className={`main-header flex justify-between align-center ${headerClass + ' ' + scrollHeaderClass}`}>
            <Link className="logo" to="/">
                <img src={logo} alt="no" />
            </Link>

            <nav className="nav-menu flex align-center">
                <NavLink className="nav-link" to="/"> HOME</NavLink>
                <NavLink className="nav-link" to="/templates"> TEMPLATES</NavLink>
                <NavLink className="nav-link" to="/editor"> EDITOR</NavLink>
                <NavLink className="nav-link" to="/collection"> COLLECTION</NavLink>
            </nav>


            {/* Login/User btn */}
            {!user && <button className="nav-link btn-login flex align-center" onClick={() => dispatch(shouldShowLogin(true))}><span>Login</span> <IoIosLogIn /></button>}

            {user &&
                <div className="greet-user flex align-center">
                    <p>Hello {user.nickname}</p>
                    <div className="user-icon-container flex align-center" onClick={() => { dispatch(onLogout()) }}>
                        {/* <FaUser /> */}
                        <MdLogout title="Logout" style={{ fontSize: "1.2rem" }} />
                    </div>
                </div>}

            <MobileHamburger user={user} shouldShowLogin={shouldShowLogin} onLogout={onLogout} />

            {(location.pathname.includes('/editor')) && <SavePublishBtns />}

        </header>


        {/* Placeholder for the Editor Page positioning */}
        <div className={`placeholder ${placeholderClass === 'hidden' ? 'hidden' : ''}`}></div>
    </>
}