import { useEffect, useRef } from 'react';

const useClickOutside = (callback: () => void) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If the ref exists and the clicked element is not inside the ref's element
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(); // Execute the provided callback function
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if the escape key was pressed
            if (event.key === 'Escape') {
                callback(); // Execute the provided callback function
            }
        };

        // Add event listeners to the document
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listeners when the component unmounts or dependencies change
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback]); // Re-run effect if the callback function changes

    return ref; // Return the ref to be attached to the target element
};

export default useClickOutside;
