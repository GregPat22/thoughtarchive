"use client";

import { LinesBackground } from "@/components/LinesBackground";
import { PageHoverProvider, usePageHover } from "@/context/PageHoverContext";

function BodyContent({ children }: { children: React.ReactNode }) {
  const { isHoveringButton } = usePageHover();
  return (
    <>
      <LinesBackground />
      <div
        className={`relative z-10 min-h-screen transition-colors duration-300 ${
          isHoveringButton ? "bg-white" : "bg-background"
        }`}
      >
        <div
          className={`min-h-screen transition-colors duration-300 ${
            isHoveringButton ? "text-[#0a0a0a]" : "text-foreground"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageHoverProvider>
      <BodyContent>{children}</BodyContent>
    </PageHoverProvider>
  );
}
