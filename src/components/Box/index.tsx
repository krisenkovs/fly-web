import { COLORS } from 'constant';
import React, { CSSProperties, LegacyRef, PropsWithChildren, useMemo } from 'react';

type Props = PropsWithChildren<
  {
    paddingLeft?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingTop?: number;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;
    marginTop?: number;
    flex?: number;
    flexDirection?: CSSProperties['flexDirection'];
    alignItems?: CSSProperties['alignItems'];
    justifyContent?: CSSProperties['justifyContent'];
    style?: CSSProperties;
    backgroundColor?: COLORS;
    width?: number;
    height?: number;
    borderRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomLeftRadius?: number;
    position?: CSSProperties['position'];
    overflow?: CSSProperties['overflow'];
    refContainer?: LegacyRef<HTMLDivElement> | null;
  } & React.HTMLAttributes<HTMLDivElement>
>;

export function Box({
  children,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  paddingBottom,
  paddingRight,
  paddingTop,
  paddingLeft,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  flex,
  flexDirection = 'column',
  justifyContent,
  alignItems,
  style,
  backgroundColor,
  width,
  height,
  borderRadius,
  overflow,
  refContainer,
  position,
  ...rest
}: Props) {
  const styles = useMemo(() => {
    const values: CSSProperties = { display: 'flex' };
    if (paddingBottom !== undefined) {
      values['paddingBottom'] = `${paddingBottom}px`;
    }
    if (paddingTop !== undefined) {
      values['paddingTop'] = `${paddingTop}px`;
    }
    if (paddingRight !== undefined) {
      values['paddingRight'] = `${paddingRight}px`;
    }
    if (paddingLeft !== undefined) {
      values['paddingLeft'] = `${paddingLeft}px`;
    }

    if (marginBottom !== undefined) {
      values['marginBottom'] = `${marginBottom}px`;
    }
    if (marginTop !== undefined) {
      values['marginTop'] = `${marginTop}px`;
    }
    if (marginRight !== undefined) {
      values['marginRight'] = `${marginRight}px`;
    }
    if (marginLeft !== undefined) {
      values['marginLeft'] = `${marginLeft}px`;
    }
    if (flex !== undefined) {
      values['flex'] = flex;
    }
    if (alignItems !== undefined) {
      values['alignItems'] = alignItems;
    }
    if (justifyContent !== undefined) {
      values['justifyContent'] = justifyContent;
    }
    if (backgroundColor !== undefined) {
      values['background'] = `var(--color-${backgroundColor})`;
    }
    if (width !== undefined) {
      values['width'] = `${width}px`;
    }
    if (height !== undefined) {
      values['height'] = `${height}px`;
    }
    if (borderRadius !== undefined) {
      values['borderRadius'] = `${borderRadius}px`;
    }
    if (overflow !== undefined) {
      values['overflow'] = overflow;
    }

    if (borderBottomRightRadius !== undefined) {
      values['borderBottomRightRadius'] = `${borderBottomRightRadius}px`;
    }

    if (borderBottomLeftRadius !== undefined) {
      values['borderBottomLeftRadius'] = `${borderBottomLeftRadius}px`;
    }
    if (position !== undefined) {
      values['position'] = position;
    }
    values['flexDirection'] = flexDirection;

    return { ...values, ...style };
  }, [
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    backgroundColor,
    width,
    height,
    borderRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    overflow,
    position,
    style,
  ]);

  return (
    <div style={styles} {...rest} ref={refContainer}>
      {children}
    </div>
  );
}
