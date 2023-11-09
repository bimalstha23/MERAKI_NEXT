import { Iuser } from '@/types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<Iuser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = Cookies.get('currentUser');
            if (user) {
                setCurrentUser(JSON.parse(user));
            }
        };

        fetchData();
    }, []);

    return currentUser;
};
