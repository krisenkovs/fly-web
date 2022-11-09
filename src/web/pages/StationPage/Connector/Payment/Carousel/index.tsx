import styles from './styles.module.css';
import { Box } from 'components/Box';
import { COLORS } from 'constant';
import React, { MouseEvent, ReactElement, TouchEvent, useEffect, useRef, useState, UIEvent } from 'react';

type Props = {
  data: { key: number | string; content?: ReactElement }[];
  onChange?: (key?: string | number) => void;
};

export function Carousel({ data, onChange }: Props) {
  const [width, setWidth] = useState(0);
  const [down, setDown] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollTo({ left: activeIndex * (width + 6), behavior: 'smooth' });
    onChange?.(data[activeIndex]?.key);
  }, [activeIndex]);

  useEffect(() => {
    function handleResize() {
      if (ref.current?.clientWidth) setWidth(ref.current?.clientWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

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

      if (diff > 10) {
        next();
      }

      if (diff < -10) {
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

  function handleScroll(e: UIEvent) {
    e.preventDefault();
  }

  return (
    <>
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
        onScroll={handleScroll}
      >
        {data?.map((item) => (
          <Box
            justifyContent="center"
            position="relative"
            overflow="hidden"
            borderRadius={12}
            className={styles.item}
            key={item.key}
          >
            {item?.content}
          </Box>
        ))}
      </div>
      <Box
        className={styles.dotContainer}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        height={8}
        marginTop={16}
      >
        {data?.map((_, index) => (
          <Box
            width={8}
            height={8}
            borderRadius={8}
            backgroundColor={index === activeIndex ? COLORS.BLUE : COLORS.PALE_BLUE}
            key={index}
          />
        ))}
      </Box>
    </>
  );
}