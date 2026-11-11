// // // import { render } from 'preact'
// // import { zikofy } from '@zikojs/preact'
// // import { Hello } from './Hello.jsx'
// // import './index.css'

// // globalThis.hello = zikofy(Hello, {name : "ziko"})

// // hello.mount(
// //     document.body
// // )
// // // import { App } from './app.jsx'

// // // render(<App />, document.getElementById('app'))

// import { render } from 'preact'
// // import { useEffect, useRef } from 'preact/hooks';
// import { useClickAwayEvent } from '@zikojs/preact-hooks';

// function Dropdown() {
//     const ref = useClickAwayEvent();

//     return (
//         <div
//             ref={ref}
//             onClickAway={event => {
//                 console.log('Outside click:', event.originalEvent);
//             }}
//         >
//             Dropdown content
//         </div>
//     );
// }

// render(
//     <Dropdown />,
//     document.body
// )

// import { useTheme } from '@zikojs/preact/hooks';
// import { render } from 'preact';

// function App() {
//     const [vars, setTheme, theme] = useTheme({
//         light: {
//             background: '#ffffff',
//             color: '#000000'
//         },
//         dark: {
//             background: '#181818',
//             color: '#ffffff'
//         }
//     });

//     const toggleTheme = () => {
//         setTheme(theme === 'light' ? 'dark' : 'light');
//     };

//     return (
//         <div style={{
//             background: vars.background,
//             color: vars.color,
//             padding: '20px'
//         }}>
//             <button onClick={toggleTheme}>
//                 Switch to {theme === 'light' ? 'Dark' : 'Light'} mode
//             </button>

//             <p>Current theme: {theme}</p>
//         </div>
//     );
// }

// render(<App />, document.body);

import { render } from 'preact';
import { createTheme, useThemeManager } from '@zikojs/preact/hooks';

const themeManager = createTheme({
    light: {
        background: '#ffffff',
        color: '#000000'
    },
    dark: {
        background: '#181818',
        color: '#ffffff'
    }
});

function App() {
    const [vars, setTheme, theme] = useThemeManager(themeManager);

    return (
        <div style={{
            background: vars.background,
            color: vars.color,
            padding: '20px'
        }}>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle theme
            </button>

            <p>Current theme: {theme}</p>
        </div>
    );
}

render(<App />, document.body);