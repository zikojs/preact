import { useCssVars } from 'ziko/hooks';
import { useState, useEffect } from 'preact/hooks';

export function createTheme(themes, {
    defaultTheme = Object.keys(themes ?? {})[0],
    namespace = 'ziko',
    target = globalThis.document?.body
} = {}) {
    if (!themes || typeof themes !== 'object' || Array.isArray(themes) || !Object.keys(themes).length) {
        throw new TypeError('themes must be a non-empty object');
    }

    if (!Object.hasOwn(themes, defaultTheme)) {
        throw new Error(`Unknown default theme: '${defaultTheme}'`);
    }

    const [vars, setVars] = useCssVars(themes[defaultTheme], { namespace, target });

    let activeTheme = defaultTheme;
    const listeners = new Set();

    const setTheme = name => {
        if (!Object.hasOwn(themes, name)) {
            throw new Error(`Unknown theme: '${name}'`);
        }

        if (activeTheme === name) return vars;

        setVars(themes[name]);
        activeTheme = name;

        listeners.forEach(listener => listener(name));

        return vars;
    };

    return {
        vars,
        setTheme,
        getTheme: () => activeTheme,
        getThemes: () => Object.keys(themes),
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
}


export function useThemeManager(manager) {
    const [theme, setThemeState] = useState(() => manager.getTheme());

    useEffect(() => {
        setThemeState(manager.getTheme());
        return manager.subscribe(setThemeState);
    }, [manager]);

    return [manager.vars, manager.setTheme, theme];
}