"use client";

import { usePageHover } from "@/context/PageHoverContext";

const PADDING = "1.5rem";
const CORNER_SIZE = "4rem";
const BORDER_WIDTH = "0.5px";

export function LinesBackground() {
  const { isHoveringButton } = usePageHover();
  const frameColor = isHoveringButton ? "#0a0a0a" : "white";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Top-left */}
      <div
        className="absolute transition-colors duration-300"
        style={{
          left: PADDING,
          top: PADDING,
          width: CORNER_SIZE,
          height: CORNER_SIZE,
          borderTop: `${BORDER_WIDTH} solid ${frameColor}`,
          borderLeft: `${BORDER_WIDTH} solid ${frameColor}`,
        }}
      />
      {/* Top-right */}
      <div
        className="absolute transition-colors duration-300"
        style={{
          right: PADDING,
          top: PADDING,
          width: CORNER_SIZE,
          height: CORNER_SIZE,
          borderTop: `${BORDER_WIDTH} solid ${frameColor}`,
          borderRight: `${BORDER_WIDTH} solid ${frameColor}`,
        }}
      />
      {/* Bottom-left */}
      <div
        className="absolute transition-colors duration-300"
        style={{
          left: PADDING,
          bottom: PADDING,
          width: CORNER_SIZE,
          height: CORNER_SIZE,
          borderBottom: `${BORDER_WIDTH} solid ${frameColor}`,
          borderLeft: `${BORDER_WIDTH} solid ${frameColor}`,
        }}
      />
      {/* Bottom-right */}
      <div
        className="absolute transition-colors duration-300"
        style={{
          right: PADDING,
          bottom: PADDING,
          width: CORNER_SIZE,
          height: CORNER_SIZE,
          borderBottom: `${BORDER_WIDTH} solid ${frameColor}`,
          borderRight: `${BORDER_WIDTH} solid ${frameColor}`,
        }}
      />
    </div>
  );
}
