import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

/**
 * Wraps children in a pinch-to-zoom (mobile) / wheel-zoom (desktop) container.
 * When `enabled` is false, renders children untouched (no wrapper).
 */
export default function ZoomableWrapper({ children, enabled = true }) {
  if (!enabled) return <>{children}</>;

  return (
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={4}
      centerOnInit
      limitToBounds={true}
      wheel={{ step: 0.15 }}
      pinch={{ step: 5 }}
      doubleClick={{ disabled: true }}
      panning={{ activationDistance: 12 }}
    >
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%" }}
        contentStyle={{ width: "100%" }}
      >
        {children}
      </TransformComponent>
    </TransformWrapper>
  );
}