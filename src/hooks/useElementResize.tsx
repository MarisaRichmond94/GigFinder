import { useLayoutEffect, useState } from 'react';

function useElementResize(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(ref.current.clientWidth);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return { width, setWidth };
};

export default useElementResize;
