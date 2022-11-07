import { COLORS } from 'constant';
import React, { CSSProperties, PropsWithChildren, useMemo } from 'react';

type Props = PropsWithChildren<{
  weight?: 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  size?: number;
  lineHeight?: number;
  color: COLORS;
  flex?: number;
  textAlign?: CSSProperties['textAlign'];
  style?: CSSProperties;
}>;

export function Typography({ children, weight, size, lineHeight, color, style, flex, textAlign, ...rest }: Props) {
  const styles = useMemo(() => {
    const values: CSSProperties = {};
    if (weight !== undefined) {
      values['fontWeight'] = weight;
    }
    if (size !== undefined) {
      values['fontSize'] = `${size}px`;
    }
    if (lineHeight !== undefined) {
      values['lineHeight'] = `${lineHeight}px`;
    }
    if (color !== undefined) {
      values['color'] = `var(--color-${color})`;
    }
    if (flex !== undefined) {
      values['flex'] = flex;
    }
    if (textAlign !== undefined) {
      values['textAlign'] = textAlign;
    }
    return { userSelect: 'none', ...values, ...style } as CSSProperties;
  }, [weight, size, lineHeight, color, flex, textAlign, style]);

  return (
    <span style={styles} {...rest}>
      {children}
    </span>
  );
}
