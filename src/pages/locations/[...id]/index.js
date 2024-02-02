// pages/blog/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LocationId = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    return null;
};

LocationId.authGuard = false;

export default LocationId;
