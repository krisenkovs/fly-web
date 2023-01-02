import React from 'react';

type Props = {
  width?: number;
  height?: number;
};

export default function MirIcon({ width = 40, height = 24 }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="24" rx="4" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.92499 8.00152C7.20959 8.00152 8.04933 7.92492 8.40438 9.1334C8.64109 9.94756 9.02712 11.2837 9.54844 13.139H9.75978C10.3234 11.1844 10.7094 9.84827 10.918 9.1334C11.2787 7.91074 12.1748 8.00152 12.5383 8.00152H15.3111V16.6963H12.4847V11.573H12.2959L10.7151 16.6963H8.59038L7.01514 11.5702H6.82637V16.6963H4V8.00152H6.92499ZM19.3717 8.00152V13.1276H19.5971L21.5133 8.91213C21.8881 8.07244 22.6799 8.00152 22.6799 8.00152H25.4161V16.6963H22.5277V11.5702H22.3023L20.4228 15.7857C20.0508 16.6197 19.2195 16.6963 19.2195 16.6963H16.4833V8.00152H19.3689H19.3717ZM35.3915 12.1347C34.9885 13.2836 33.7261 14.1063 32.3256 14.1063H29.2963V16.6963H26.5517V12.1347H35.3915Z"
        fill="#0F754E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.4581 8.00153H26.4109C26.5518 9.93622 28.2087 11.5929 29.9192 11.5929H35.5831C35.9072 9.98445 34.7857 8.00153 32.4581 8.00153Z"
        fill="url(#paint0_linear_1155_1850)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1155_1850"
          x1="49.5712"
          y1="11.6242"
          x2="40.1446"
          y2="11.6242"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F5CD7" />
          <stop offset="1" stopColor="#02AEFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
