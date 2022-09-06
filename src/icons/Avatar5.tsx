import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function Avatar54({ width = 68, height = 68, color = COLORS.PALE_BLUE }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_105_1172" maskUnits="userSpaceOnUse" x="0" y="0" width="68" height="68">
        <circle cx="34" cy="34" r="34" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0_105_1172)">
        <path d="M41.3656 59.329L40.2076 40.6548L26.6415 42.9546L26.5171 59.5238" fill="white" />
        <path
          d="M41.3656 59.329L40.2076 40.6548L26.6415 42.9546L26.5171 59.5238"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M26.5713 52.3701C26.5713 52.3701 35.2022 53.0898 40.5431 46.0769L40.2076 40.6548L26.647 42.9546L26.5713 52.3701Z"
          fill="#656A71"
        />
        <path
          d="M41.3656 59.329L40.2076 40.6548L26.6415 42.9546L26.5171 59.5238"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M26.5173 52.6731C26.5173 52.6731 32.7727 56.8073 40.9816 52.0508L41.8312 58.4415C41.8312 58.4415 54.8128 58.4523 56.4848 60.1298C58.9902 62.6352 57.9188 72.343 57.9188 72.343H11.1818C11.1818 72.343 10.0455 61.3744 13.4545 60.1298C16.869 58.8852 25.9924 58.4415 25.9924 58.4415L26.5173 52.6731Z"
          fill="#2C2E31"
        />
        <path
          d="M22.4044 38.4849C22.4044 38.4849 8.60568 16.3962 31.7658 11.6072C54.926 6.81283 50.137 36.0336 44.1955 39.2966C38.2539 42.5542 22.4044 38.4849 22.4044 38.4849Z"
          fill="#2C2E31"
        />
        <path
          d="M45.8406 30.2814C45.8352 30.2814 45.8297 30.2814 45.8297 30.2814C45.8297 30.0163 45.8406 29.7565 45.8352 29.4914C45.6025 20.2868 40.8622 14.1667 33.2973 14.3561C25.873 14.5455 20.8568 21.3528 20.8893 30.303C20.8189 30.2976 20.7486 30.2814 20.6836 30.2814C18.557 30.2814 17.5181 31.6072 17.5181 32.9221C17.5181 34.2424 19.1198 36.1039 20.9596 35.5682C21.122 35.5195 21.2897 35.4654 21.4575 35.395C23.0646 42.473 27.8752 47.8355 34.1468 47.6786C40.0289 47.5271 43.9574 42.1753 45.3103 35.4816C45.3968 35.5087 45.4834 35.5465 45.5646 35.5682C47.4044 36.1039 49.0061 34.237 49.0061 32.9221C49.0061 31.6072 47.9672 30.2814 45.8406 30.2814Z"
          fill="white"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M20.4722 33.8636C20.3856 33.6039 20.2882 33.3441 20.1584 33.1169C20.0339 32.8842 19.8499 32.6948 19.6335 32.6407C19.4278 32.592 19.114 32.6786 19.0328 32.8463C18.9625 33.0465 19.1032 33.3333 19.2493 33.5498V33.5552C19.2601 33.5714 19.2547 33.5931 19.2384 33.5985C19.2276 33.6093 19.206 33.6039 19.1951 33.5931C19.0058 33.3928 18.7731 33.1493 18.8434 32.7814C18.8975 32.6028 19.0599 32.4892 19.206 32.4405C19.3521 32.3863 19.5144 32.3593 19.6822 32.3863C20.0285 32.4567 20.2341 32.7435 20.364 33.0032C20.483 33.2738 20.5534 33.5552 20.5642 33.8474C20.5642 33.8744 20.5426 33.8961 20.5209 33.8961C20.4939 33.8961 20.4776 33.8853 20.4722 33.8636Z"
          fill="#2C2E31"
        />
        <path
          d="M45.6616 33.8474C45.6724 33.5552 45.7374 33.2738 45.8618 33.0032C45.9863 32.7489 46.1973 32.4567 46.5437 32.3863C46.7114 32.3593 46.8792 32.3863 47.0198 32.4405C47.166 32.4946 47.3283 32.6028 47.3824 32.7814C47.4473 33.1493 47.2201 33.3928 47.0307 33.5931C47.0198 33.6039 46.9982 33.6039 46.982 33.5931C46.9711 33.5822 46.9711 33.566 46.9766 33.5498V33.5444C47.1227 33.3225 47.2634 33.0357 47.193 32.8409C47.1118 32.6731 46.8034 32.5866 46.5924 32.6353C46.3759 32.684 46.1919 32.8788 46.0675 33.1115C45.9322 33.3387 45.8402 33.5985 45.7536 33.8582C45.7482 33.8853 45.7211 33.8961 45.6941 33.8907C45.6779 33.8853 45.6616 33.869 45.6616 33.8474Z"
          fill="#2C2E31"
        />
        <path
          d="M25.2783 27.6461C25.2783 27.6461 31.5824 26.856 31.8909 28.5443C32.1993 30.2327 32.0694 34.0368 32.0694 34.0368C33.1138 34.0801 33.9255 34.0476 33.9255 34.0476"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M42.8755 28.0087C40.6353 27.4622 38.5952 27.6029 36.2251 28.0466"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M37.9514 29.4154C38.92 29.2098 39.9427 29.1611 40.8897 29.3397C42.0477 29.5561 41.9773 30.6221 40.6462 30.8548C39.9373 30.9793 38.7035 31.0334 37.9514 30.7899C37.0314 30.4869 37.1126 29.594 37.9514 29.4154Z"
          stroke="#2C2E31"
          strokeWidth="0.7117"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M25.9167 29.4154C26.8853 29.2098 27.9081 29.1611 28.855 29.3397C30.013 29.5561 29.9427 30.6221 28.6115 30.8548C27.9026 30.9793 26.6689 31.0334 25.9167 30.7899C24.9968 30.4869 25.0726 29.594 25.9167 29.4154Z"
          stroke="#2C2E31"
          strokeWidth="0.7117"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M28.0705 30.0649C28.0705 30.5033 27.8 30.855 27.4645 30.855C27.129 30.855 26.8584 30.5033 26.8584 30.0649C26.8584 29.6266 27.129 29.2749 27.4645 29.2749C27.8 29.2749 28.0705 29.632 28.0705 30.0649Z"
          fill="#2C2E31"
        />
        <path
          d="M40.1052 30.0649C40.1052 30.5033 39.8346 30.855 39.4991 30.855C39.1636 30.855 38.8931 30.5033 38.8931 30.0649C38.8931 29.6266 39.1636 29.2749 39.4991 29.2749C39.8346 29.2749 40.1052 29.632 40.1052 30.0649Z"
          fill="#2C2E31"
        />
        <path
          d="M30.4077 37.5161C30.4077 37.5161 33.2594 40.5626 36.5928 37.5161"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M26.8581 36.3688C27.5276 36.3688 28.0702 35.8261 28.0702 35.1567C28.0702 34.4873 27.5276 33.9446 26.8581 33.9446C26.1887 33.9446 25.646 34.4873 25.646 35.1567C25.646 35.8261 26.1887 36.3688 26.8581 36.3688Z"
          fill="#F0F0F0"
        />
        <path
          d="M40.1052 36.3688C40.7746 36.3688 41.3173 35.8261 41.3173 35.1567C41.3173 34.4873 40.7746 33.9446 40.1052 33.9446C39.4358 33.9446 38.8931 34.4873 38.8931 35.1567C38.8931 35.8261 39.4358 36.3688 40.1052 36.3688Z"
          fill="#F0F0F0"
        />
        <path
          d="M25.2563 28.907L25.5323 29.5834"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M25.9438 28.6633L26.09 29.3776"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M26.6255 28.5444L26.7283 29.2695"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M27.3076 28.501L27.3455 29.2315"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M28 28.501L28.0054 29.2315"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M28.7034 28.5388L28.6602 29.2693"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M29.3687 28.6633L29.228 29.3776"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M37.459 28.7393L37.6863 29.4319"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M38.1626 28.5444L38.26 29.2695"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M38.855 28.4741L38.9037 29.2046"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M39.5367 28.4795L39.5205 29.21"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M40.224 28.5281L40.1807 29.2586"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M40.928 28.6201L40.8306 29.3452"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M41.5825 28.7878L41.3877 29.4913"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M21.2192 26.894L37.6478 26.131L38.8491 20.5249L39.5472 26.0011L45.3588 25.8766C45.3588 25.8766 44.9205 14.1234 33.4865 13.5173C33.492 13.5227 23.0212 14.3615 21.2192 26.894Z"
          fill="#2C2E31"
        />
        <path
          d="M37.9077 15.3896C40.7767 15.3896 43.1025 13.0638 43.1025 10.1948C43.1025 7.32579 40.7767 5 37.9077 5C35.0387 5 32.7129 7.32579 32.7129 10.1948C32.7129 13.0638 35.0387 15.3896 37.9077 15.3896Z"
          fill="#2C2E31"
        />
        <circle cx="34" cy="34" r="33.5" stroke={`var(--color-${color}`} />
      </g>
    </svg>
  );
}
