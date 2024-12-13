import React, { createContext, useContext, useRef, type PropsWithChildren } from 'react';
import { type StoreApi, useStore as useZustandStore } from 'zustand';
import { useStore } from './index';

interface StoreProviderProps extends PropsWithChildren {
  children: React.ReactNode;
}

const StoreContext = createContext<StoreApi<ReturnType<typeof useStore>> | null>(null);

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<StoreApi<ReturnType<typeof useStore>>>();
  if (!storeRef.current) {
    storeRef.current = useStore;
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext<T>(selector: (state: ReturnType<typeof useStore>) => T): T {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Store not found');
  }
  return useZustandStore(store, selector);
}