import React, { useState, useRef } from 'react';
import { StatusBar, SafeAreaView, Animated, Dimensions, RefreshControl } from 'react-native';
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
  const [statusBarHeight] = useState(getStatusBarHeight());
  /**
   * interpolateを指定する理由。
   * 速い速度で上にスクロールするとscrollYの値がマイナスの値になる。この場合画面上では、本来ならtop:0だが、ヘッダーが少し上にはみ出る形になってしまう。
   * それに伴ってtopTranslateもbottomTranslateもマイナスの値になってしまう。理由はわからず
   * なのでその不具合を埋めるためにdiffClampの結果が-7の場合でも0に収束するようにinterpolateを使うようにした
   *
   */
  const topTranslateRef = useRef(
    Animated.diffClamp(Animated.multiply(scrollY, -1), -topHeight, 0).interpolate({
      inputRange: [-64, -7, 0],
      outputRange: [-64, 0, 0],
      extrapolate: 'clamp',
    }),
  );
  const bottomTranslateRef = useRef(
    Animated.diffClamp(Animated.multiply(scrollY, -1), -bottomHeight, 0).interpolate({
      inputRange: [-64, -7, 0],
      outputRange: [-64, 0, 0],
      extrapolate: 'clamp',
    }),
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
          scrollEventThrottle={1}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Animated.View
            style={{
              paddingTop:
                topHeight !== bottomHeight
                  ? headerHeight + Math.abs(topHeight - bottomHeight)
                  : headerHeight,
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
