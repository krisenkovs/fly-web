import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function Avatar8({ width = 68, height = 68, color = COLORS.PALE_BLUE }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_105_1314" maskUnits="userSpaceOnUse" x="0" y="0" width="68" height="68">
        <circle cx="34" cy="34" r="34" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0_105_1314)">
        <path d="M41.8309 61.2903L40.5735 41.113L25.9172 43.5986L25.7769 61.5067" fill="white" />
        <path
          d="M41.8309 61.2903L40.5735 41.113L25.9172 43.5986L25.7769 61.5067"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M25.8354 53.775C25.8354 53.775 35.1638 54.5528 40.9362 46.9732L40.5736 41.113L25.9173 43.5986L25.8354 53.775Z"
          fill="#656A71"
        />
        <path
          d="M41.8309 61.2903L40.5735 41.113L25.9172 43.5986L25.7769 61.5067"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M25.7769 54.0967C25.7769 54.0967 34.5672 55.9156 41.5035 54.1376L41.9129 57.1964C42.1468 58.9802 43.6382 60.3312 45.4337 60.3779C49.6738 60.4949 56.9025 60.8868 58.1658 62.15C60.8736 64.8579 59.7156 75.35 59.7156 75.35H9.19651C9.19651 75.35 7.96833 63.4952 11.6529 62.15C13.9747 61.302 18.7354 60.799 21.9462 60.5417C23.8353 60.3896 25.3325 58.9041 25.5021 57.0151L25.7769 54.0967Z"
          fill="#F0F0F0"
        />
        <path
          d="M25.7769 54.0967C25.7769 54.0967 34.5672 55.9156 41.5035 54.1376L41.9129 57.1964C42.1468 58.9802 43.6382 60.3312 45.4337 60.3779C49.6738 60.4949 56.9025 60.8868 58.1658 62.15C60.8736 64.8579 59.7156 75.35 59.7156 75.35H9.19651C9.19651 75.35 7.96833 63.4952 11.6529 62.15C13.9747 61.302 18.7354 60.799 21.9462 60.5417C23.8353 60.3896 25.3325 58.9041 25.5021 57.0151L25.7769 54.0967Z"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M46.6617 29.9015C46.6559 29.9015 46.65 29.9015 46.65 29.9015C46.65 29.6149 46.6617 29.3342 46.6559 29.0476C46.4044 19.0994 41.2811 12.4847 33.1049 12.6894C25.0808 12.8941 19.6593 20.2515 19.6944 29.9249C19.6184 29.919 19.5423 29.9015 19.4721 29.9015C17.1737 29.9015 16.0508 31.3344 16.0508 32.7556C16.0508 34.1826 17.7819 36.1945 19.7704 35.6155C19.9459 35.5628 20.1272 35.5043 20.3085 35.4283C22.0455 43.0781 27.2448 48.8739 34.0232 48.7043C40.3804 48.5406 44.6264 42.7564 46.0886 35.5219C46.1821 35.5511 46.2757 35.5921 46.3634 35.6155C48.3519 36.1945 50.0831 34.1767 50.0831 32.7556C50.0831 31.3344 48.9602 29.9015 46.6617 29.9015Z"
          fill="white"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M19.244 33.7673C19.1504 33.4866 19.0452 33.2058 18.9048 32.9543C18.7703 32.7029 18.5714 32.4982 18.3375 32.4397C18.1152 32.387 17.776 32.4806 17.6883 32.6619C17.6123 32.8783 17.7643 33.1883 17.9223 33.4222V33.4281C17.9339 33.4456 17.9281 33.469 17.9106 33.4749C17.8989 33.4866 17.8755 33.4807 17.8638 33.469C17.6591 33.2526 17.4076 32.9894 17.4836 32.5917C17.5421 32.3987 17.7176 32.2759 17.8755 32.2233C18.0334 32.1648 18.2147 32.1355 18.3901 32.1648C18.7644 32.2408 18.9867 32.5508 19.127 32.8315C19.2557 33.1239 19.3317 33.4281 19.3434 33.7439C19.3434 33.7731 19.32 33.7965 19.2966 33.7965C19.2733 33.8082 19.2557 33.7907 19.244 33.7673Z"
          fill="#2C2E31"
        />
        <path
          d="M46.4741 33.7556C46.4858 33.4398 46.556 33.1357 46.6905 32.8432C46.825 32.5684 47.0531 32.2525 47.4274 32.1765C47.6087 32.1473 47.79 32.1765 47.9421 32.235C48.1 32.2935 48.2754 32.4104 48.3339 32.6034C48.4041 33.0011 48.1585 33.2643 47.9538 33.4807C47.9421 33.4924 47.9187 33.4924 47.9012 33.4807C47.8895 33.469 47.8894 33.4515 47.8953 33.4339V33.4281C48.0532 33.1883 48.2053 32.8783 48.1292 32.6678C48.0474 32.4865 47.7082 32.3929 47.4801 32.4455C47.2461 32.4982 47.0473 32.7087 46.9128 32.9602C46.7665 33.2058 46.6671 33.4866 46.5735 33.7731C46.5677 33.8024 46.5385 33.8141 46.5092 33.8082C46.4858 33.7965 46.4741 33.7731 46.4741 33.7556Z"
          fill="#2C2E31"
        />
        <path
          d="M24.4375 27.0475C24.4375 27.0475 31.251 26.1936 31.5843 28.0183C31.9177 29.843 31.7773 33.9545 31.7773 33.9545C32.9061 34.0013 33.7834 33.9662 33.7834 33.9662"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M43.4622 27.4392C42.9651 27.2111 42.2282 26.9947 41.579 26.8251C40.6257 26.5737 39.6314 26.5737 38.6781 26.8076C37.6313 27.0708 36.6663 27.3749 36.2744 27.4802"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M38.1401 28.96C39.187 28.7377 40.2923 28.6851 41.3158 28.8781C42.5674 29.112 42.4914 30.2642 41.0526 30.5157C40.2865 30.6502 38.953 30.7087 38.1401 30.4455C37.1459 30.1238 37.2277 29.153 38.1401 28.96Z"
          stroke="#2C2E31"
          strokeWidth="0.7117"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M25.1272 28.96C26.1741 28.7377 27.2795 28.6851 28.3029 28.8781C29.5545 29.112 29.4785 30.2642 28.0398 30.5157C27.2736 30.6502 25.9402 30.7087 25.1272 30.4455C24.133 30.1238 24.2207 29.153 25.1272 28.96Z"
          stroke="#2C2E31"
          strokeWidth="0.7117"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M27.4551 29.6676C27.4551 30.1413 27.1627 30.5215 26.8 30.5215C26.4374 30.5215 26.145 30.1413 26.145 29.6676C26.145 29.1939 26.4374 28.8137 26.8 28.8137C27.1627 28.8137 27.4551 29.1939 27.4551 29.6676Z"
          fill="#2C2E31"
        />
        <path
          d="M39.8127 30.5215C40.1745 30.5215 40.4678 30.1392 40.4678 29.6676C40.4678 29.196 40.1745 28.8137 39.8127 28.8137C39.451 28.8137 39.1577 29.196 39.1577 29.6676C39.1577 30.1392 39.451 30.5215 39.8127 30.5215Z"
          fill="#2C2E31"
        />
        <path
          d="M29.9814 37.7207C29.9814 37.7207 33.3034 42.4404 36.6662 37.7207"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M24.4136 28.4158L24.7119 29.1468"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M25.1621 28.1526L25.32 28.9246"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M25.8931 28.0237L26.01 28.8015"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M26.6357 27.9771L26.6767 28.7666"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M27.3784 27.9771L27.3901 28.7666"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M28.1391 28.0181L28.0923 28.8076"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M28.864 28.1467L28.7061 28.9246"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M37.6079 28.2344L37.8535 28.983"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M38.3682 28.0239L38.4676 28.8076"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M39.1108 27.948L39.1635 28.7375"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M39.8535 27.9539L39.8359 28.7434"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M40.5966 28.0063L40.5498 28.7959"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M41.3509 28.106L41.2456 28.8897"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M42.0641 28.2871L41.8535 29.0474"
          stroke="#2C2E31"
          strokeWidth="0.4858"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M46.6615 29.9015C49.0477 27.1586 48.9015 22.7371 48.3342 20.2925C47.5329 16.8243 45.1877 13.7597 42.2401 11.1747C38.6608 8.03989 33.8533 5.76484 28.1335 7.73578C24.0747 9.13941 25.0222 11.6952 25.0222 11.6952C25.0222 11.6952 18.0566 12.128 20.0977 19.269C21.7821 25.1759 33.6604 20.7194 37.725 18.4443C40.5908 16.8419 42.977 16.7717 44.3455 19.6082C45.872 22.7839 46.6615 29.9015 46.6615 29.9015Z"
          fill="#2C2E31"
        />
        <path
          d="M18.4305 19.3333C18.6703 18.5613 19.1265 17.7542 19.6646 16.9588C20.6763 15.4558 22.9397 15.754 23.6415 17.4267C23.7292 17.6314 23.8111 17.8244 23.9047 18.0057C23.4193 18.4677 21.7641 20.6141 21.4659 21.2633C19.9687 24.5443 19.4715 29.9073 19.4715 29.9073C17.1263 27.0533 17.3895 22.7196 18.4305 19.3333Z"
          fill="#2C2E31"
        />
        <circle cx="34" cy="34" r="33.5" stroke={`var(--color-${color}`} />
      </g>
    </svg>
  );
}