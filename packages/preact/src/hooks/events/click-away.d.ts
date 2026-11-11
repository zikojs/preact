import type { RefObject } from 'preact';

/**
 * Registers a click-away event listener on a DOM element.
 *
 * Returns a ref that should be attached to the target element.
 * The element receives a `clickaway` event whenever the user clicks
 * or taps outside its boundaries.
 *
 * @returns A Preact ref object to attach to the target element.
 *
 * @example
 * ```tsx
 * import { useClickAwayEvent } from '@zikojs/preact';
 *
 * function Dropdown() {
 *     const ref = useClickAwayEvent();
 *
 *     return (
 *         <div
 *             ref={ref}
 *             onClickaway={event => {
 *                 console.log('Outside click:', event.detail.originalEvent);
 *             }}
 *         >
 *             Dropdown content
 *         </div>
 *     );
 * }
 * ```
 */
export declare function useClickAwayEvent(): RefObject<HTMLElement | null>;