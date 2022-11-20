import React from 'react';
import { BalanceView } from 'web/components/BalanceView';
import { CardView } from 'web/components/CardView';
import { Carousel } from 'web/components/Carousel';
import { PAYMENT_TYPE } from 'web/pages/StationPage/Connector/Payment/types';

type Props = {
  onChange: (key?: string | number) => void;
};

export function BottomCarousel({ onChange }: Props) {
  return (
    <Carousel
      data={[
        { key: PAYMENT_TYPE.ACCOUNT, content: <BalanceView /> },
        { key: PAYMENT_TYPE.CARD, content: <CardView /> },
      ]}
      onChange={onChange}
    />
  );
}
