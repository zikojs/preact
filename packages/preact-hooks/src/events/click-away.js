import { registerClickAwayEvent } from 'ziko/hooks/events';
import { useEffect, useRef } from 'preact/hooks';
export function useClickAwayEvent() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        return registerClickAwayEvent(ref.current);
    }, []);

    return ref;
}