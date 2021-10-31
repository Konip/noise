import React from 'react';

interface IuseOnClickOutside {
  ref: React.MutableRefObject<Element>
  handler(value: React.SyntheticEvent): void
  exception?: Element
}

export const useOnClickOutside = ({ref, handler, exception}:IuseOnClickOutside):void => {

  React.useEffect(
    () => {
      const listener = (event: any) => {
        const target = event.target as Element;
        let res = target?.closest('svg')?.closest('div')?.contains(exception!)
        if (!ref.current || ref.current.contains(target) || res) {
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