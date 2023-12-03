import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Iuser } from '../../types';

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<Iuser | null>(() => {
        const userString = Cookies.get('currentUser');
        return userString ? JSON.parse(userString) : null;
    });
    const user = Cookies.get('currentUser');
    useEffect(() => {
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, [user, setCurrentUser]); // Run this effect only once when the component mounts

    return { currentUser, setCurrentUser };
};
