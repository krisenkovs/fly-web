import styles from './styles.module.css';
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
    <Box height={240} borderRadius={12} marginTop={-64} position="relative" className={styles.container}>
      <div
        className={styles.content}
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
            className={styles.item}
            style={{
              width,
              minWidth: width,
            }}
          >
            <img src={`${API.IMAGE}/${item.imageId}`} alt="" className={styles.image} />
          </div>
        ))}
      </div>
      <div className={styles.dotContainer}>
        {data?.map((_, index) => (
          <div
            className={styles.dot}
            style={{
              width: index === activeIndex ? '25px' : '4px',
            }}
            key={index}
          />
        ))}
      </div>
    </Box>
  );
}
