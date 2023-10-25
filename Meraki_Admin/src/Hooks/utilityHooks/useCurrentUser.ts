
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Iuser } from '../../globalTypes';

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<Iuser | null>(null)
    const user = Cookies.get('currentUser');
    useEffect(() => {
        if (user) {
            setCurrentUser(JSON.parse(user))
        }
    }, [user])
    return currentUser
}