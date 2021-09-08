/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';

import { StickyHeader } from '../components/StickyHeader';
import { Text, TouchableOpacity, View } from 'react-native';

describe('StickyHeader', () => {
  it('Snapshot Test', () => {
    const { toJSON } = render(
      <StickyHeader onLayout={jest.fn()}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            alignItems: 'center',
            height: 64,
          }}
        >
          <View
            style={{
              marginTop: 2,
              width: 16,
              height: 16,
            }}
          ></View>
          <View>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                今すぐ・東京都千代田区1丁目1番地
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 2,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                👾
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </StickyHeader>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
