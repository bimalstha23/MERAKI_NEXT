import { Iuser } from '@/types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

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