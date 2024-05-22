'use client';
import { useState } from 'react';

interface UseMutationState<T> {
  isLoading: boolean;
  data?: T;
  error?: Object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];
type Method = 'POST' | 'PUT' | 'GET' | 'DELETE';

export default function useMutation<T = any>(
  url: string,
  method: Method
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    data: undefined,
    isLoading: false,
    error: undefined,
  });

  const func = (data: any | null) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setState((prev) => ({ ...prev, data, isLoading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, isLoading: false }))
      );
  };

  return [func, { ...state }];
}
