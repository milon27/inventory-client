import { useContext, useEffect } from 'react';
import { StateContext } from './../utils/context/AppContext';
import { useRouter } from 'next/router'
import Define from '../utils/Define';

export default function ProtectedContent({ url }) {
    const { auth } = useContext(StateContext)
    const router = useRouter();
    //life cycle
    useEffect(() => {
        // console.log("auth ", auth.id)
        if (auth.id) {
            router.push(url)
        } else {
            router.push('/login')
        }
    }, [auth])

    return (
        <>

        </>
    )
}
