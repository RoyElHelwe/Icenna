// pages/blog/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Location = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    return null;
};

Location.authGuard = false;

export default Location;
