import * as React from 'react';
import { UserService } from '../../services/UserService';
import { useNavigate } from 'react-router';

interface IPrivateRouteProps {
}

const PrivateRoute: React.FunctionComponent<React.PropsWithChildren<IPrivateRouteProps>> = ({
    children
}) => {
    const isLoggedIn = UserService.isTheUserLoggedIn();
    const navigate = useNavigate();

    if (isLoggedIn) {
        return (
            <>{children}</>
        );
    } else {
        navigate('/login');
    }
};

export default PrivateRoute;
