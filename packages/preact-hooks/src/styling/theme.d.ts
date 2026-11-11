
import type { Themes, ThemeVars } from 'ziko/hooks';

/**
 * Configuration options for createTheme.
 */
export interface CreateThemeOptions {
    /** Initial theme name. Defaults to the first theme. */
    defaultTheme?: string;

    /** CSS variable namespace. Defaults to "ziko". */
    namespace?: string;

    /** DOM element where CSS variables are applied. Defaults to document.body. */
    target?: HTMLElement | SVGElement | Document;
}

/**
 * Theme manager created by createTheme.
 */
export interface ThemeManager<T extends Themes> {
    /** CSS variable references. */
    vars: ThemeVars<T>;

    /** Changes the active theme and notifies subscribers. */
    setTheme(name: keyof T): ThemeVars<T>;

    /** Returns the currently active theme name. */
    getTheme(): keyof T;

    /** Returns all available theme names. */
    getThemes(): (keyof T)[];

    /**
     * Subscribes to theme changes.
     *
     * @param listener - Callback invoked with the new theme name.
     * @returns Unsubscribe function.
     */
    subscribe(listener: (theme: keyof T) => void): () => boolean;
}

/**
 * Creates a standalone theme manager.
 *
 * Can be used outside Preact components to manage themes globally.
 *
 * @param themes - Theme definitions.
 * @param options - Optional theme configuration.
 * @returns A theme manager instance.
 *
 * @example
 * ```tsx
 * import { createTheme } from '@zikojs/preact/hooks';
 *
 * const theme = createTheme({
 *     light: {
 *         background: '#ffffff',
 *         color: '#000000'
 *     },
 *     dark: {
 *         background: '#181818',
 *         color: '#ffffff'
 *     }
 * });
 *
 * theme.setTheme('dark');
 * console.log(theme.getTheme()); // 'dark'
 * ```
 */
export declare function createTheme<T extends Themes>(
    themes: T,
    options?: CreateThemeOptions
): ThemeManager<T>;

/**
 * Preact hook that subscribes to a theme manager.
 *
 * Automatically updates the component when the active theme changes,
 * including changes made outside the component.
 *
 * @param manager - Theme manager created with createTheme.
 * @returns A tuple containing CSS variables, the theme setter,
 * and the reactive current theme name.
 *
 * @example
 * ```tsx
 * import { render } from 'preact';
 * import {
 *     createTheme,
 *     useThemeManager
 * } from '@zikojs/preact/hooks';
 *
 * const themeManager = createTheme({
 *     light: {
 *         background: '#ffffff',
 *         color: '#000000'
 *     },
 *     dark: {
 *         background: '#181818',
 *         color: '#ffffff'
 *     }
 * });
 *
 * function App() {
 *     const [vars, setTheme, theme] = useThemeManager(themeManager);
 *
 *     return (
 *         <div style={{
 *             background: vars.background,
 *             color: vars.color
 *         }}>
 *             <button onClick={() =>
 *                 setTheme(theme === 'light' ? 'dark' : 'light')
 *             }>
 *                 Toggle theme
 *             </button>
 *
 *             <p>Current theme: {theme}</p>
 *         </div>
 *     );
 * }
 *
 * render(<App />, document.body);
 *
 * // Also works outside components:
 * themeManager.setTheme('dark');
 * ```
 */
export declare function useThemeManager<T extends Themes>(
    manager: ThemeManager<T>
): [
    vars: ThemeVars<T>,
    setTheme: (name: keyof T) => ThemeVars<T>,
    theme: keyof T
];
