import React from 'react';

export function useOnClickOutside(ref, handler, exception) {
  React.useEffect(
    () => {
      const listener = (event) => {
        let res = event.target?.closest('svg')?.closest('div')?.contains(exception)
        if (!ref.current || ref.current.contains(event.target) || res) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    [ref, handler]
  );
}