import styles from './styles.module.css';
import { Box } from 'components/Box';
import React, { MouseEvent, ReactElement, TouchEvent, useEffect, useRef, useState, UIEvent } from 'react';
import { InlineDots } from 'web/components/Carousel/InlineDots';
import { OutlineDots } from 'web/components/Carousel/OutlineDots';

type Props = {
  data: { key: number | string; content?: ReactElement }[];
  onChange?: (key?: string | number) => void;
  inlineDotContainer?: boolean;
};

export function Carousel({ data, onChange, inlineDotContainer = false }: Props) {
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
    e.preventDefault();
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
      {inlineDotContainer ? (
        <InlineDots data={data} activeIndex={activeIndex} />
      ) : (
        <OutlineDots data={data} activeIndex={activeIndex} />
      )}
    </>
  );
}
