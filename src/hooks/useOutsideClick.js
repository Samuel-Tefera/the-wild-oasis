import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleCloseModal(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener('click', handleCloseModal, listenCapturing);
      return () =>
        document.removeEventListener(
          'click',
          handleCloseModal,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );

  return ref;
}
