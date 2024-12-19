import { useEffect, useRef } from 'react';

function useChatScroll(dep: any) {
    const ref = useRef<HTMLElement>();

    useEffect(() => {
        setTimeout(() =>{
            if (ref.current) {
                ref.current.scrollTo({ top: ref.current.scrollHeight, behavior:'smooth' });
            }
        })
    }, [dep]);
}