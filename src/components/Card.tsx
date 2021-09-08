import React from 'react';
import { Dimensions, StyleProp, Text, View, ViewStyle } from 'react-native';

export interface ICard {
  title: string;
  description: string;
  score: number;
  style?: StyleProp<ViewStyle>;
}

export function Card({ title, description, score, style }: ICard) {
  return (
    <View
      style={[
        {
          width: Dimensions.get('screen').width,
          backgroundColor: '#fffffff',
          paddingTop: 12,
          paddingBottom: 16,
          paddingHorizontal: 14,
        },
        style,
      ]}
    >
      <View
        style={{
          width: '100%',
          height: 156,
          backgroundColor: '#f0f0f0',
          marginBottom: 12,
        }}
      ></View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {title.length > 25 ? `${title.slice(0, 25)}...` : title}
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            paddingVertical: 6,
            paddingHorizontal: 4,
            backgroundColor: '#f0f0f0',
          }}
        >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {score}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
