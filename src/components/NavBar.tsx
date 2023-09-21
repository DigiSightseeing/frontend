import {
    faHouse,
    faPhone,
    faGlobe,
    faMoneyBill,
    faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import NavSideBar from './NavSideBar';

const NavBar = () => {
    const navBarItems = [
        {
            title: 'Home',
            path: '/',
            icon: <FontAwesomeIcon icon={faHouse} />,
        },
        {
            title: 'Contact',
            path: '/contact',
            icon: <FontAwesomeIcon icon={faPhone} />,
        },
        {
            title: 'About Us',
            path: '/about',
            icon: <FontAwesomeIcon icon={faGlobe} />,
        },
        {
            title: 'Pricing',
            path: '/pricing',
            icon: <FontAwesomeIcon icon={faMoneyBill} />,
        },
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <FontAwesomeIcon icon={faChartLine} />,
        },
    ];
    return (
        <div>
            <nav className=" xs:flex fixed left-0 top-0 z-20  hidden w-full justify-end border-b-[1px] border-textsecondary bg-bgsecondary py-3 pr-5 align-middle sm:flex lg:justify-center">
                <div className="flex flex-row items-center">
                    <div className="hidden lg:block">
                        {navBarItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className="mr-2 rounded-lg px-3 py-2 text-textsecondary hover:bg-bgtertiary hover:text-textprimary">
                                {item.title}
                            </NavLink>
                        ))}
                    </div>

                    <NavSideBar element={navBarItems} />
                </div>
            </nav>
            <nav className=" fixed bottom-0 left-0 z-20 flex w-full justify-center border-t-[1px] border-textsecondary bg-bgsecondary py-3 align-middle sm:hidden md:hidden lg:hidden">
                {navBarItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className="mr-2 rounded-lg px-3 py-2  text-textsecondary hover:bg-bgtertiary hover:text-textprimary">
                        <div className="flex flex-col justify-center align-middle">
                            {item.icon}
                            <p className="text-xxs">{item.title}</p>
                        </div>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default NavBar;
