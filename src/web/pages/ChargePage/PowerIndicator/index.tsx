import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React from 'react';

type Props = {
  value?: number;
  max?: number;
  color?: COLORS;
};

export const PowerIndicator = ({ value = 28, max = 29, color = COLORS.GREEN }: Props) => {
  const fillCount = Math.round((value / max) * 29);

  return (
    <Box height={108} width={128} position='relative'>
      <svg width="126" height="91" viewBox="0 0 126 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[
          'M4.78047 86.9188L13.094 83.4791C13.5873 84.6659 14.122 85.8316 14.6964 86.9743L6.65153 91C5.98096 89.666 5.35658 88.3049 4.78047 86.9188Z',
          'M1.94257 78.4075L10.6646 76.193C10.9827 77.4402 11.3445 78.6699 11.7481 79.8805L3.20838 82.7153C2.73678 81.301 2.31418 79.8644 1.94257 78.4075Z',

          'M0.0395274 60.6099C0.0132491 61.3559 0 62.1052 0 62.8576C0 63.61 0.0132494 64.3593 0.0395281 65.1053L9.03398 64.7899C9.0114 64.149 9 63.5048 9 62.8576C9 62.2104 9.0114 61.5663 9.03397 60.9253L0.0395274 60.6099Z',
          'M0.355979 69.5794L9.30555 68.6301C9.44241 69.9146 9.62441 71.1849 9.84983 72.4394L0.991085 74.024C0.727908 72.5594 0.515577 71.0772 0.355979 69.5794Z',
          'M0.991081 51.6913L9.84983 53.2759C9.62441 54.5304 9.44241 55.8007 9.30555 57.0852L0.355977 56.1359C0.515575 54.638 0.727905 53.1558 0.991081 51.6913Z',
          'M3.20838 43L11.7481 45.8348C11.3445 47.0454 10.9827 48.2751 10.6646 49.5223L1.94257 47.3078C2.31417 45.8508 2.73678 44.4142 3.20838 43Z',
          'M6.65153 34.7153L14.6964 38.741C14.122 39.8837 13.5873 41.0494 13.094 42.2362L4.78047 38.7965C5.35657 37.4104 5.98096 36.0493 6.65153 34.7153Z',
          'M11.2455 27.0059L18.6338 32.1336C17.9006 33.1854 17.2041 34.2641 16.5462 35.3681L8.81036 30.7788C9.57797 29.4908 10.3904 28.2324 11.2455 27.0059Z',
          'M16.8903 20.0253L23.476 26.1456C22.5994 27.0846 21.7561 28.0548 20.9479 29.0542L13.9435 23.4155C14.8857 22.2505 15.8687 21.1197 16.8903 20.0253Z',
          'M23.4685 13.912L29.12 20.9006C28.1183 21.7069 27.146 22.5484 26.2049 23.423L20.0707 16.8521C21.1675 15.8328 22.3008 14.8521 23.4685 13.912Z',
          'M30.8485 8.79046L35.4482 16.5088C34.3417 17.1652 33.2605 17.8601 32.2064 18.5917L27.067 11.2201C28.2963 10.3669 29.5575 9.55633 30.8485 8.79046Z',
          'M38.8844 4.76967L42.3319 13.0644C41.1423 13.5566 39.974 14.0901 38.8287 14.6632L34.7939 6.6365C36.1309 5.96745 37.4951 5.34448 38.8844 4.76967Z',
          'M47.4149 1.93819L49.6345 10.6405C48.3844 10.9579 47.1519 11.3188 45.9386 11.7216L43.0973 3.20113C44.5148 2.7306 45.9547 2.30895 47.4149 1.93819Z',
          'M56.2631 0.355175L57.2145 9.28452C55.927 9.42108 54.6539 9.60266 53.3966 9.82758L51.8083 0.988846C53.2762 0.726264 54.7618 0.514412 56.2631 0.355175Z',
          'M65.2528 0.039438L64.9367 9.01356C64.2943 8.99103 63.6487 8.97966 63 8.97966C62.3513 8.97966 61.7057 8.99103 61.0633 9.01356L60.7472 0.0394388C61.4949 0.0132195 62.2459 0 63 0C63.7541 0 64.5051 0.0132192 65.2528 0.039438Z',
          'M74.1917 0.988842L72.6034 9.82757C71.3461 9.60266 70.073 9.42107 68.7855 9.28452L69.7369 0.355173C71.2382 0.51441 72.7238 0.72626 74.1917 0.988842Z',
          'M82.9027 3.20113L80.0614 11.7216C78.8481 11.3188 77.6156 10.9579 76.3655 10.6405L78.5851 1.93818C80.0453 2.30894 81.4852 2.73059 82.9027 3.20113Z',
          'M91.2061 6.6365L87.1712 14.6632C86.0259 14.0901 84.8577 13.5566 83.6681 13.0644L87.1156 4.76967C88.5049 5.34447 89.8691 5.96744 91.2061 6.6365Z',
          'M98.9329 11.2201L93.7936 18.5917C92.7395 17.8601 91.6582 17.1652 90.5518 16.5088L95.1515 8.79045C96.4424 9.55632 97.7036 10.3669 98.9329 11.2201Z',
          'M105.929 16.8521L99.7951 23.423C98.854 22.5484 97.8817 21.7069 96.88 20.9005L102.531 13.912C103.699 14.852 104.832 15.8328 105.929 16.8521Z',
          'M112.056 23.4155L105.052 29.0542C104.244 28.0548 103.401 27.0846 102.524 26.1456L109.11 20.0253C110.131 21.1197 111.114 22.2505 112.056 23.4155Z',
          'M117.19 30.7788L109.454 35.3681C108.796 34.2641 108.099 33.1853 107.366 32.1336L114.754 27.0059C115.61 28.2324 116.422 29.4908 117.19 30.7788Z',
          'M121.22 38.7965L112.906 42.2362C112.413 41.0494 111.878 39.8837 111.304 38.741L119.348 34.7153C120.019 36.0493 120.643 37.4104 121.22 38.7965Z',
          'M124.057 47.3077L115.335 49.5223C115.017 48.2751 114.656 47.0454 114.252 45.8348L122.792 42.9999C123.263 44.4142 123.686 45.8508 124.057 47.3077Z',
          'M125.644 56.1359L116.694 57.0852C116.558 55.8006 116.376 54.5304 116.15 53.2759L125.009 51.6912C125.272 53.1558 125.484 54.638 125.644 56.1359Z',
          'M125.96 65.1053L116.966 64.7899C116.989 64.149 117 63.5048 117 62.8576C117 62.2104 116.989 61.5663 116.966 60.9253L125.96 60.6099C125.987 61.3559 126 62.1052 126 62.8576C126 63.61 125.987 64.3593 125.96 65.1053Z',

          'M125.009 74.024L116.15 72.4393C116.376 71.1848 116.558 69.9146 116.694 68.6301L125.644 69.5793C125.484 71.0772 125.272 72.5594 125.009 74.024Z',
          'M122.792 82.7153L114.252 79.8805C114.656 78.6699 115.017 77.4402 115.335 76.1929L124.057 78.4075C123.686 79.8644 123.263 81.301 122.792 82.7153Z',

          'M119.348 91L111.304 86.9743C111.878 85.8315 112.413 84.6659 112.906 83.4791L121.22 86.9188C120.643 88.3049 120.019 89.666 119.348 91Z',
        ].map((item, index) => (
          <path
            key={index}
            fillRule="evenodd"
            clipRule="evenodd"
            d={item}
            fill={index < fillCount ? `var(--color-${color})` : 'var(--color-pale-blue'}
          />
        ))}
      </svg>

      <Box
        width={92}
        height={92}
        borderRadius={46}
        backgroundColor={COLORS.PALE_BLUE}
        className={styles.content}
        alignItems="center"
        justifyContent="center"
      >
        <Typography color={COLORS.BLACK} weight={800} size={24} lineHeight={30}>
          {value}
        </Typography>
        <Typography color={COLORS.LIGHT_BLACK} weight={500} size={12} lineHeight={15}>
          kW
        </Typography>
      </Box>
    </Box>
  );
};
