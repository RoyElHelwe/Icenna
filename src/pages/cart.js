// pages/blog/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Cart = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    return null;
};

Cart.authGuard = false;

export default Cart;
