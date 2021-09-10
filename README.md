# react-native-simple-sticky-header

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Github Actions](https://github.com/takagimeow/react-native-simple-sticky-header/workflows/Test%20for%20PR/badge.svg)](https://github.com/takagimeow/react-native-simple-sticky-header)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![NPM version](https://img.shields.io/npm/v/react-native-simple-sticky-header.svg?style=flat-square)](https://npmjs.com/package/react-native-simple-sticky-header)
[![NPM downloads](https://img.shields.io/npm/dm/react-native-simple-sticky-header.svg?style=flat-square)](https://npmjs.com/package/react-native-simple-sticky-header)

This is the simplest sticky header component made for ReactNative.

<p align="center">
  <img src="https://user-images.githubusercontent.com/66447334/132624539-87cf437e-992e-4a02-8d8c-b4e0dd0ebf79.gif" height="542" alt="Simple" />
</p>

## Installation

```bash
# npm
npm instal react-native-simple-sticky-header

# yarn
yarn add react-native-simple-sticky-header
```

## Usage

Here is a quick example.

```tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { StickyHeaderScrollView } from 'react-native-simple-sticky-header';

export function Button({ children, active = false }: { children: string; active?: boolean }) {
  return (
    <TouchableOpacity>
      <View
        style={{
          borderRadius: 25,
          backgroundColor: active ? '#333333' : '#ffffff',
          paddingVertical: 12,
          paddingHorizontal: 16,
          marginHorizontal: 4,
          width: 116,
        }}
      >
        <Text
          style={{
            color: active ? '#ffffff' : '#333333',
            textAlignVertical: 'center',
            textAlign: 'center',
          }}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default function App() {
  return (
    <StickyHeaderScrollView
      top={() => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button active>配達</Button>
            <Button>お持ち帰り</Button>
          </View>
        </View>
      )}
      bottom={() => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <View
            style={{
              marginTop: 2,
            }}
          >
            <TouchableOpacity>
              <Feather size={0} name="sliders" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                今すぐ・東京都千代田区1丁目1番地 <Feather size={16} name="chevron-down" />
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 2,
            }}
          >
            <TouchableOpacity>
              <Feather size={16} name="sliders" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      topHeight={64}
      bottomHeight={64}
      scrollViewBackground={'#f7f7f7'}
    >
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </StickyHeaderScrollView>
  );
}
```

## Props and methods

### Props

#### children (Required)

Type: React.ReactElement

Contents to be displayed on the screen.

#### headerBackground

Type: string

Header background color.

#### scrollViewBackground

Type: String

Background color of the drawing area.

#### refreshing

Type: Boolean

Flag indicating whether the content is being updated.

#### top (Required)

Type: (ref: React.LegacyRef<View>) => React.ReactElement

Function which return a header component that disappears when scrolled.

#### bottom (Required)

Type: (ref: React.LegacyRef<View>) => React.ReactElement

Function which return a header component that does not disappear when scrolled.

#### onRefresh

Type: () => void

Function to be called on update.
