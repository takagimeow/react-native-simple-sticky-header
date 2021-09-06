import React from 'react';
import { Animated } from 'react-native';

export interface ITopHeader {
  children: React.ReactElement;
  opacity: Animated.AnimatedInterpolation;
  style?: {
    height?: number | string;
  };
}

export function TopHeader({ children, opacity, style }: ITopHeader) {
  return (
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
  );
}
