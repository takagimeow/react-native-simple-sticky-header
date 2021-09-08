import React, { useState, useRef, useEffect } from 'react';
import {
  StatusBar,
  SafeAreaView,
  Animated,
  Dimensions,
  RefreshControl,
  Platform,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StickyHeader } from './StickyHeader';
import { TopHeader } from './TopHeader';

export interface IStickyHeaderScrollView {
  children: React.ReactElement;
  top: (ref: React.LegacyRef<View>) => React.ReactElement;
  bottom: (ref: React.LegacyRef<View>) => React.ReactElement;
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
  statusBarBackground = '#C4C4C4',
  headerBackground = '#ffffff',
  scrollViewBackground = '#ffffff',
  refreshing = false,
  onRefresh,
}: IStickyHeaderScrollView) {
  const [topHeight, setTopHeight] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);
  const headerComponentRef = useRef(null);
  const topComponentRef = useRef(null);
  const bottomComponentRef = useRef(null);
  const scrollViewRef = useRef(new Animated.Value(0));
  const scrollY = useRef(new Animated.Value(0)).current;
  const translateYRef = useRef(new Animated.Value(0));
  const opacityRef = useRef(new Animated.Value(0));

  const [statusBarHeight] = useState(getStatusBarHeight());
  const [headerHeight, setHeaderHeight] = useState(topHeight + bottomHeight + statusBarHeight);
  const [paddingTop, setPaddingTop] = useState(0);
  const lastTimeOffsetRef = useRef(0);
  const animatingRef = useRef(false);
  useEffect(() => {
    const newHeaderHeight =
      Platform.OS === 'android'
        ? topHeight + bottomHeight + statusBarHeight
        : topHeight + bottomHeight;
    const paddingTop =
      Platform.OS === 'android'
        ? topHeight !== bottomHeight
          ? newHeaderHeight + Math.abs(topHeight - bottomHeight)
          : newHeaderHeight
        : 0;
    setHeaderHeight(newHeaderHeight);
    setPaddingTop(paddingTop);
  }, [topHeight, headerHeight, scrollViewRef]);

  useEffect(() => {
    scrollY.addListener(event => {
      if (animatingRef.current) {
        return;
      }
      console.log('event.value: ', event.value);
      console.log('lastTimeOffsetRef.current: ', lastTimeOffsetRef.current);
      console.log('\n\n\n');
      if (
        event.value <= 0 ||
        (event.value <= lastTimeOffsetRef.current && event.value < Dimensions.get('screen').height)
      ) {
        // 点灯
        Animated.parallel([
          Animated.timing(translateYRef.current, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }),
          Animated.timing(opacityRef.current, {
            toValue: 1,
            duration: 160,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          animatingRef.current = !finished;
        });
      } else {
        // 消灯
        Animated.parallel([
          Animated.timing(translateYRef.current, {
            toValue: -topHeight,
            duration: 160,
            useNativeDriver: true,
          }),
          Animated.timing(opacityRef.current, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          animatingRef.current = !finished;
        });
      }
      lastTimeOffsetRef.current = event.value;
    });

    return () => {
      scrollY.removeAllListeners();
    };
  }, [topHeight, headerHeight, headerComponentRef]);

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
            paddingTop,
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
        ref={headerComponentRef}
        style={[
          {
            position: 'absolute',
            top: statusBarHeight,
            width: Dimensions.get('screen').width,
            backgroundColor: headerBackground,
            transform: [
              {
                translateY: translateYRef.current,
              },
            ],
          },
        ]}
      >
        <TopHeader
          opacity={opacityRef.current}
          onLayout={event => {
            const height = event.nativeEvent.layout.height;
            setTopHeight(height);
          }}
        >
          <View>{top(topComponentRef)}</View>
        </TopHeader>
        <StickyHeader
          onLayout={event => {
            const height = event.nativeEvent.layout.height;
            setBottomHeight(height);
          }}
        >
          {bottom(bottomComponentRef)}
        </StickyHeader>
      </Animated.View>
      <StatusBar backgroundColor={statusBarBackground} translucent={true} />
    </>
  );
}
