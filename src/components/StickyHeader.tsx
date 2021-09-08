import React from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';

export interface IStickyHeader {
  children: React.ReactElement;
  style?: {
    height?: number | string;
  };
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}

export function StickyHeader({ children, style, onLayout }: IStickyHeader) {
  return (
    <Animated.View onLayout={onLayout}>
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
    </Animated.View>
  );
}
