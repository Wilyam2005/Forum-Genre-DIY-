import React, { useRef, useState, useCallback, useEffect } from 'react';
import { sounds } from '../../utils/soundEffects';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees, default 10
  scale?: number; // scale on hover, default 1.02
  glare?: boolean; // whether to show holographic light sheen
  glareOpacity?: number; // max glare opacity, default 0.25
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Universal 3D Interactive Tilt Card Component
 * Creates authentic 3D spatial depth, physical inertia, dynamic light sheen,
 * and allows child elements with translateZ to float forward in real 3D space.
 */
export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.2,
  onClick,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const animationFrameRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate normalized tilt (-1 to 1)
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setTilt({
          x: -percentY * maxTilt, // Inverted for natural tilt
          y: percentX * maxTilt,
        });

        if (glare) {
          setGlarePosition({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
            opacity: glareOpacity,
          });
        }
      });
    },
    [maxTilt, glare, glareOpacity]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
    sounds.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    if (onClick) {
      sounds.playClick();
      onClick();
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative perspective-[1000px] transition-transform duration-200 ease-out select-none ${className}`}
      style={{
        ...style,
      }}
    >
      <div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-200 ease-out will-change-transform rounded-[inherit]"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${scale}, ${scale}, ${scale})`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {children}

        {/* Dynamic Holographic / Specular Sheen Glare */}
        {glare && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
            style={{
              opacity: glarePosition.opacity,
              background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 80%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </div>
  );
};
