import { useEffect, useRef } from 'react';

export function useCloseModal(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClose(e) {
        if (ref.current && !ref.current.contains(e.target)) handler?.();
        return;
      }

      document.addEventListener('click', handleClose, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClose, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
