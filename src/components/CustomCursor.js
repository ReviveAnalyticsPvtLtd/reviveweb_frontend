'use client'
import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    if(window === undefined) return;
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const cursor = cursorRef.current;
      cursor.style.left = `${clientX - cursor.offsetWidth / 6}px`;
      cursor.style.top = `${clientY - cursor.offsetHeight / 6}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed z-50 rounded-full bg-cyan-600	 opacity-40 blur-3xl pointer-events-none"
      style={{ width: '120px', height: '120px' }}
    />
  );
};

export default CustomCursor;