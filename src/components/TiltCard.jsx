import React, { useRef } from 'react';
import useTilt3D from './useTilt3D';

/**
 * Wraps any card content with a mouse-driven 3D tilt + glare sheen.
 * Renders as `Tag` (default div) and keeps all passed className/props
 * so it drops straight into existing grid/card markup.
 */
export default function TiltCard({
  as: Tag = 'div',
  className = '',
  max = 10,
  scale = 1.025,
  lift = 8,
  glare = true,
  children,
  ...rest
}) {
  const ref = useRef(null);
  useTilt3D(ref, { max, scale, lift, glare });

  return (
    <Tag ref={ref} className={`tilt-card ${className}`} {...rest}>
      {glare && <span className="tilt-card__glare" aria-hidden="true" />}
      {children}
    </Tag>
  );
}
