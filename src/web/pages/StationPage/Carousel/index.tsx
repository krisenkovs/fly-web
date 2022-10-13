import { Box } from 'components/Box';
import React, { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { API } from 'web/constant';

type Props = {
  data: { id?: number; imageId?: string }[];
};

export function Carousel({ data }: Props) {
  const [width, setWidth] = useState(0);
  const [down, setDown] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollTo({ left: activeIndex * width, behavior: 'smooth' });
  }, [activeIndex]);

  useEffect(() => {
    if (ref.current?.clientWidth) {
      setWidth(ref.current?.clientWidth);
    }
  }, [ref.current?.clientWidth]);

  const next = () => {
    if (activeIndex < data?.length - 1) {
      setActiveIndex((prevState) => prevState + 1);
      setDown(0);
    }
  };

  const prev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevState) => prevState - 1);
      setDown(0);
    }
  };

  const move = (x: number) => {
    if (down) {
      const diff = down - x;

      if (diff > 5) {
        next();
      }

      if (diff < -5) {
        prev();
      }
    }
  };

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    move(e.clientX || 0);
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    move(e.touches?.[0]?.clientX || 0);
  }

  function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
    setDown(e?.clientX || 0);
  }
  function handleTouchDown(e: TouchEvent<HTMLDivElement>) {
    setDown(e?.touches?.[0]?.clientX || 0);
  }
  function handleMouseUp() {
    setDown(0);
  }

  return (
    <Box height={240} borderRadius={12} marginTop={-64} style={{ position: 'relative', zIndex:1 }}>
      <div
        style={{
          height: '240px',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
        }}
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {data?.map((item) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              width,
              minWidth: width,
              userSelect: 'none',
              borderRadius: '12px',
            }}
          >
            <img
              src={`${API.IMAGE}/${item.imageId}`}
              alt=""
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        {data?.map((_, index) => (
          <div
            style={{
              width: index === activeIndex ? '25px' : '4px',
              height: '4px',
              borderRadius: '4px',
              background: 'var(--color-white)',
            }}
            key={index}
          />
        ))}
      </div>
    </Box>
  );
}
