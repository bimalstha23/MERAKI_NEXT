import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Iuser } from '../../types';

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<Iuser | null>(null);

    useEffect(() => {
        const user = Cookies.get('currentUser');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []); // Run this effect only once when the component mounts

    useEffect(() => {
        const handleCookieChange = (_event: Event) => {
            const updatedUser = Cookies.get('currentUser');
            if (updatedUser) {
                setCurrentUser(JSON.parse(updatedUser));
            } else {
                setCurrentUser(null);
            }
        };

        // Subscribe to cookie change events
        window.addEventListener('storage', handleCookieChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', handleCookieChange);
        };
    }, []); // Run this effect only once when the component mounts
    console.log(currentUser, 'currentuser')

    return currentUser;
};
