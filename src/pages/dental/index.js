// pages/blog/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Dental = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    return null;
};

Dental.authGuard = false;

export default Dental;
