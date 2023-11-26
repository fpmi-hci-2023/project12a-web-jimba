import React from 'react';
import PropTypes from 'prop-types';
import { userService } from '../../infrastructure';
import { useNavigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    const isLogedIn = userService.isTheUserLoggedIn();
    const navigate = useNavigate();

    if (isLogedIn) {
        return (
            <>{children}</>
        );
    } else {
        navigate('/login');
    }
};


PrivateRoute.propTypes = {

};


export default PrivateRoute;
