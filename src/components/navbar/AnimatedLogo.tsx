import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedLogoProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Interactive logo with:
 *  - Continuous floating Y-axis animation
 *  - Hover: scale up + slight rotation
 *  - Tap: pop (shrink + bounce back)
 *  - Magnetic effect: follows the cursor when nearby
 */
const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ src, alt, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Raw mouse offset values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring follow for the magnetic effect
  const springConfig = { damping: 15, stiffness: 150, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Limit the magnetic pull so it stays subtle
  const tx = useTransform(x, (v) => Math.max(-12, Math.min(12, v)));
  const ty = useTransform(y, (v) => Math.max(-12, Math.min(12, v)));

  const RADIUS = 80; // px around the logo where the magnetic effect kicks in
  const STRENGTH = 0.35;

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS) {
      mouseX.set(dx * STRENGTH);
      mouseY.set(dy * STRENGTH);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: tx, y: ty, display: 'inline-block', willChange: 'transform' }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        draggable={false}
        animate={
          isHovering
            ? { y: 0, scale: 1.1, rotate: 10 }
            : { y: [0, -6, 0], scale: 1, rotate: 0 }
        }
        transition={
          isHovering
            ? { type: 'spring', stiffness: 300, damping: 15 }
            : {
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.3 },
                rotate: { duration: 0.3 },
              }
        }
        whileTap={{
          scale: 0.85,
          transition: { type: 'spring', stiffness: 500, damping: 10 },
        }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
