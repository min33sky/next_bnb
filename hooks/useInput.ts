import React, { useState } from 'react';

type FieldEvent<T> = React.ChangeEvent<
  { value: T; name?: string } & (
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
  )
>;

type ReturnType<T> = [T, (_event: FieldEvent<T>) => void];

/**
 * Input Hook
 * @param initialValue 초기값
 * @returns [state, handler]
 */
export default function useInput<T>(initialValue: T): ReturnType<T> {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: FieldEvent<T>) => {
    setValue(event.target.value);
  };

  return [value, onChange];
}
