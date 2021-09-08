import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
