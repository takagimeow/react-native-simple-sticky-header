# react-native-simple-sticky-header

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
import { StatusBar } from 'expo-status-bar';
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
        <StatusBar style="auto" />
      </View>
    </StickyHeaderScrollView>
  );
}
```

## Props and methods

---

### Props

---

#### topHeight

#### bottomHeight

#### statusBarBackground

#### headerBackground

#### scrollViewBackground

#### refreshing

### Methods

---

#### top

#### bottom

#### onRefresh