import React from 'react';
import { Carousel } from 'web/components/Carousel';
import { FullPowerItem } from 'web/pages/StationPage/Connector/Payment/TopCarousel/FullPowerItem';
import { MiddlePowerItem } from 'web/pages/StationPage/Connector/Payment/TopCarousel/MiddlePowerItem';
import { PowerInputItem } from 'web/pages/StationPage/Connector/Payment/TopCarousel/PowerInputItem';
import { POWER_TYPE } from 'web/pages/StationPage/Connector/Payment/types';

type Props = {
  onChange: (key?: string | number) => void;
  rate?: number;
};

export function TopCarousel({ onChange, rate }: Props) {
  return (
    <Carousel
      data={[
        { key: POWER_TYPE.FULL, content: <FullPowerItem /> },
        { key: POWER_TYPE.MIDDLE, content: <MiddlePowerItem /> },
        {
          key: POWER_TYPE.MANUAL,
          content: <PowerInputItem rate={rate} />,
        },
      ]}
      onChange={onChange}
    />
  );
}
