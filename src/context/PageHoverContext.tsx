"use client";

import { createContext, useContext, useState, useCallback } from "react";

type PageHoverContextValue = {
  isHoveringButton: boolean;
  setHoveringButton: (value: boolean) => void;
};

const PageHoverContext = createContext<PageHoverContextValue | null>(null);

export function usePageHover() {
  const ctx = useContext(PageHoverContext);
  if (!ctx) return { isHoveringButton: false, setHoveringButton: () => {} };
  return ctx;
}

export function PageHoverProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHoveringButton, setHoveringButton] = useState(false);
  const value: PageHoverContextValue = {
    isHoveringButton,
    setHoveringButton: useCallback((v: boolean) => setHoveringButton(v), []),
  };
  return (
    <PageHoverContext.Provider value={value}>
      {children}
    </PageHoverContext.Provider>
  );
}
