import React from 'react';

type Props = {
  width?: number;
  height?: number;
};

export default function GooglePayIcon({ width = 40, height = 24 }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="24" rx="4" fill="white" />
      <path
        d="M19.0602 8.4978V11.1664H20.6942C21.0827 11.1664 21.4064 11.0361 21.6616 10.7715C21.9244 10.5108 22.0539 10.1964 22.0539 9.83211C22.0539 9.46786 21.9244 9.16879 21.6616 8.90423C21.4064 8.63583 21.0827 8.50163 20.6942 8.50163H19.0602V8.4978ZM19.0602 12.102V15.1962H18.0852V7.55841H20.6751C21.334 7.55841 21.8939 7.77696 22.351 8.2179C22.8194 8.65884 23.0518 9.19563 23.0518 9.82828C23.0518 10.4609 22.8194 11.0169 22.351 11.4502C21.8977 11.8834 21.3379 12.102 20.6751 12.102H19.064H19.0602ZM24.0382 13.5973C24.0382 13.8542 24.1449 14.0651 24.362 14.2376C24.5752 14.4102 24.8304 14.4945 25.1199 14.4945C25.5312 14.4945 25.8969 14.3412 26.2168 14.0344C26.5405 13.7277 26.7005 13.3711 26.7005 12.957C26.3958 12.7155 25.973 12.5928 25.4284 12.5928C25.0323 12.5928 24.7009 12.6886 24.4343 12.8803C24.1677 13.072 24.0382 13.3098 24.0382 13.5935V13.5973ZM25.3027 9.7976C26.0225 9.7976 26.5938 9.98932 27.0128 10.3804C27.4279 10.7677 27.6374 11.3006 27.6374 11.9755V15.1962H26.7043V14.4715H26.6624C26.2587 15.0658 25.7217 15.3687 25.0475 15.3687C24.4762 15.3687 23.9963 15.1962 23.6116 14.855C23.227 14.5137 23.0327 14.0881 23.0327 13.5743C23.0327 13.0337 23.2384 12.6043 23.6421 12.286C24.0496 11.9639 24.5943 11.8067 25.2722 11.8067C25.8511 11.8067 26.331 11.9141 26.7043 12.1288V11.9026C26.7043 11.5614 26.571 11.2738 26.3006 11.0322C26.0416 10.7983 25.7026 10.668 25.356 10.6756C24.8114 10.6756 24.381 10.9057 24.0611 11.3696L23.2003 10.8252C23.6726 10.1427 24.3772 9.80144 25.3027 9.80144V9.7976ZM32.9962 9.97014L29.7398 17.5006H28.7305L29.9417 14.8665L27.7974 9.97014H28.86L30.4102 13.7239H30.4292L31.9374 9.97014H33.0001H32.9962Z"
        fill="#3C4043"
      />
      <path
        d="M15.1148 11.4344C15.1148 11.1277 15.0881 10.8286 15.0386 10.5449H10.9214V12.2358H13.279C13.1838 12.7841 12.8676 13.2633 12.4068 13.5701V14.6667H13.816C14.6387 13.9037 15.1148 12.7726 15.1148 11.4382V11.4344Z"
        fill="#4285F4"
      />
      <path
        d="M10.9212 15.7253C12.0981 15.7253 13.0922 15.3342 13.8159 14.6671L12.4067 13.5705C12.0144 13.835 11.5116 13.9884 10.9212 13.9884C9.78245 13.9884 8.81504 13.2177 8.46845 12.1748H7.01733V13.3059C7.76003 14.7898 9.26827 15.7253 10.9212 15.7253Z"
        fill="#34A853"
      />
      <path
        d="M8.46756 12.1748C8.28481 11.6304 8.28481 11.0399 8.46756 10.4954V9.36432H7.01697C6.71239 9.97396 6.55249 10.6488 6.55249 11.3351C6.55249 12.0214 6.72 12.7116 7.01697 13.3059L8.46756 12.1748Z"
        fill="#FABB05"
      />
      <path
        d="M10.9212 8.68137C11.5648 8.68137 12.1399 8.90375 12.5932 9.34085L13.8386 8.08706C13.0845 7.37773 12.098 6.94446 10.9173 6.94446C9.26818 6.94446 7.75612 7.88001 7.01343 9.36386L8.46456 10.495C8.81116 9.45588 9.77854 8.68137 10.9173 8.68137"
        fill="#E94235"
      />
    </svg>
  );
}
