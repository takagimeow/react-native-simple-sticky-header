import React, { useState, useRef } from 'react';
import {
  StatusBar,
  SafeAreaView,
  Animated,
  Dimensions,
  RefreshControl,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StickyHeader } from './StickyHeader';
import { TopHeader } from './TopHeader';

export interface IStickyHeaderScrollView {
  children: React.ReactElement;
  top: () => React.ReactElement;
  bottom: () => React.ReactElement;
  topHeight: number;
  bottomHeight: number;
  statusBarBackground?: string;
  headerBackground?: string;
  scrollViewBackground?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function StickyHeaderScrollView({
  children,
  top,
  bottom,
  topHeight = 64,
  bottomHeight = 64,
  statusBarBackground = '#C4C4C4',
  headerBackground = '#ffffff',
  scrollViewBackground = '#ffffff',
  refreshing = false,
  onRefresh,
}: IStickyHeaderScrollView) {
  const scrollViewRef = useRef(new Animated.Value(0));
  const scrollY = useRef(new Animated.Value(0)).current;
  // scrollYが >= 0になることを保証
  const clampedScrollY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  });
  const [statusBarHeight] = useState(getStatusBarHeight());
  const topTranslateRef = useRef(
    Animated.diffClamp(Animated.multiply(clampedScrollY, -1), -topHeight, 0),
  );
  const bottomTranslateRef = useRef(
    Animated.diffClamp(Animated.multiply(clampedScrollY, -1), -bottomHeight, 0),
  );
  // 下段ヘッダーが一番上の位置に来た時に
  //（初期位置からbottomHeight分引かれた位置。この時点で上段ヘッダーは画面外に消えている）、
  // 上段ヘッダーのopacityは0になる。
  // 下段ヘッダーが初期位置に移動するにつれて、上段ヘッダーのopacityが1に戻る
  const topOpacity = bottomTranslateRef.current.interpolate({
    inputRange: [-bottomHeight, -(bottomHeight - 1)],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const [headerHeight] = useState(topHeight + bottomHeight + statusBarHeight);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: scrollViewBackground,
        }}
      >
        <Animated.ScrollView
          ref={scrollViewRef}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                progressViewOffset={headerHeight}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            ) : undefined
          }
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          contentInset={{
            top:
              Platform.OS === 'ios'
                ? topHeight !== bottomHeight
                  ? headerHeight + Math.abs(topHeight - bottomHeight)
                  : headerHeight
                : 0,
          }}
          contentOffset={{
            x: 0,
            y:
              Platform.OS === 'ios'
                ? topHeight !== bottomHeight
                  ? -(headerHeight + Math.abs(topHeight - bottomHeight))
                  : -headerHeight
                : 0,
          }}
          contentContainerStyle={{
            paddingTop:
              Platform.OS === 'android'
                ? topHeight !== bottomHeight
                  ? headerHeight + Math.abs(topHeight - bottomHeight)
                  : headerHeight
                : 0,
          }}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Animated.View
            style={{
              backgroundColor: 'transparent',
            }}
          >
            {children}
          </Animated.View>
        </Animated.ScrollView>
      </SafeAreaView>
      <Animated.View
        style={{
          position: 'absolute',
          top: statusBarHeight,
          width: Dimensions.get('window').width,
          backgroundColor: headerBackground,
          transform: [
            {
              translateY: topTranslateRef.current,
            },
          ],
        }}
      >
        <TopHeader opacity={topOpacity} style={{ height: topHeight }}>
          {top()}
        </TopHeader>
        <StickyHeader
          style={{
            height: bottomHeight,
          }}
        >
          {bottom()}
        </StickyHeader>
      </Animated.View>
      <StatusBar backgroundColor={statusBarBackground} translucent={true} />
    </>
  );
}
