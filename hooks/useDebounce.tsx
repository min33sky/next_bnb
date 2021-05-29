import { useEffect, useState } from 'react';

/**
 * Debounce Hook
 * 특정 시간 후에 값을 리턴하는 훅
 * @param value
 * @param delay
 * @returns debouncedValue
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};

export default useDebounce;
