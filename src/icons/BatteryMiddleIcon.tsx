import React from 'react';

type Props = {
  width?: number;
  height?: number;
};

export default function BatteryMiddleIcon({ width = 58, height = 58 }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.375 3.625C23.375 2.52043 24.2704 1.625 25.375 1.625L33.5313 1.625C34.6358 1.625 35.5313 2.52043 35.5313 3.625C35.5313 4.72957 34.6358 5.625 33.5313 5.625L25.375 5.625C24.2704 5.625 23.375 4.72957 23.375 3.625Z"
        fill="#656A71"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9167 10.0625C15.7867 10.0625 14.5938 11.2124 14.5938 13.0027L14.5938 50.4348C14.5938 52.2251 15.7867 53.375 16.9167 53.375L40.1771 53.375C41.3071 53.375 42.5 52.2251 42.5 50.4348L42.5 13.0027C42.5 11.2124 41.3071 10.0625 40.1771 10.0625L16.9167 10.0625ZM12.5938 13.0027C12.5938 10.4408 14.3763 8.0625 16.9167 8.0625L40.1771 8.0625C42.7175 8.0625 44.5 10.4408 44.5 13.0027L44.5 50.4348C44.5 52.9967 42.7175 55.375 40.1771 55.375L16.9167 55.375C14.3763 55.375 12.5938 52.9967 12.5938 50.4348L12.5938 13.0027Z"
        fill="#656A71"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8437 27.1875C18.8437 26.0829 19.7392 25.1875 20.8437 25.1875L37.1563 25.1875C38.2608 25.1875 39.1563 26.0829 39.1563 27.1875C39.1563 28.2921 38.2608 29.1875 37.1563 29.1875L20.8438 29.1875C19.7392 29.1875 18.8437 28.2921 18.8437 27.1875Z"
        fill="#3BC561"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8437 36.25C18.8437 35.1454 19.7392 34.25 20.8437 34.25L37.1563 34.25C38.2608 34.25 39.1563 35.1454 39.1563 36.25C39.1563 37.3546 38.2608 38.25 37.1563 38.25L20.8438 38.25C19.7392 38.25 18.8437 37.3546 18.8437 36.25Z"
        fill="#3BC561"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8437 45.3125C18.8437 44.2079 19.7392 43.3125 20.8437 43.3125L37.1563 43.3125C38.2608 43.3125 39.1563 44.2079 39.1563 45.3125C39.1563 46.4171 38.2608 47.3125 37.1563 47.3125L20.8438 47.3125C19.7392 47.3125 18.8437 46.4171 18.8437 45.3125Z"
        fill="#3BC561"
      />
    </svg>
  );
}