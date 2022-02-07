import { useRef, useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = ref => {
  const observerRef = useRef();
  const [intersecting, setIntersecting] = useState(false);

  const getObserver = useCallback(() => {
    if (!observerRef?.current) {
      observerRef.current = new IntersectionObserver(entries =>
        setIntersecting(entries.some(entry => entry.isIntersecting)),
      );
    }
    return observerRef.current;
  }, []);

  useEffect(() => {
    if (ref.current) {
      getObserver().observe(ref.current);
    }

    return () => getObserver().disconnect();
  }, [getObserver, ref]);

  return [intersecting, setIntersecting];
};

export default useInfiniteScroll;
