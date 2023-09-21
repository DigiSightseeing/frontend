import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

const DefaultLayout = () => {
    return (
        <div>
            <NavBar />
            <div className=" pb-20 pt-2 sm:pt-20 md:pb-0">
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
