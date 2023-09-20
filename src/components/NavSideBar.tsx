import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface NavSideBarProps {
    element: {
        title: string;
        path: string;
        icon: JSX.Element;
    }[];
}
const NavSideBar = (props: NavSideBarProps) => {
    const [openStatus, setOpenStatus] = useState(false);
    const OpenCloseButton = () => {
        return (
            <button onClick={() => setOpenStatus(!openStatus)}>
                <FontAwesomeIcon icon={faBars} className="text-textsecondary" />
            </button>
        );
    };
    return (
        <div className="block lg:hidden ">
            <OpenCloseButton />
            <div
                className={`fixed right-0 top-0 flex h-screen flex-col items-end bg-bgsecondary pr-3 pt-3 duration-300 ease-in-out  ${
                    openStatus ? 'translate-x-0 ' : 'translate-x-full'
                }`}>
                <OpenCloseButton />
                <div className="flex w-[300px] flex-col gap-y-4 pl-6 pt-4">
                    {props.element.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className="mr-2 rounded-lg px-3 py-2 text-textsecondary hover:bg-bgquaternary hover:text-textprimary">
                            <div className="flex flex-row items-center justify-start gap-x-2 align-middle">
                                {item.icon}
                                <p className="text-md">{item.title}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavSideBar;
