import React from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';

export interface ITopHeader {
  children: React.ReactElement;
  opacity?: number | Animated.Value | Animated.AnimatedInterpolation | undefined;
  style?: {
    height?: number | string;
  };
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}

export function TopHeader({ children, opacity, style, onLayout }: ITopHeader) {
  return (
    <Animated.View onLayout={onLayout}>
      <Animated.View
        style={{
          ...style,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          opacity,
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}
