import React from 'react';
import { Animated } from 'react-native';

export interface IStickyHeader {
  children: React.ReactElement;
  style?: {
    height?: number | string;
  };
}

export function StickyHeader({ children, style }: IStickyHeader) {
  return (
    <Animated.View
      style={{
        ...style,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Animated.View>
  );
}
