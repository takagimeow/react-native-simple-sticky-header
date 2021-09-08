/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';

import { TopHeader } from '../components/TopHeader';
import { View } from 'react-native';
import { Button } from '../components/Button';

describe('TopHeader', () => {
  it('Snapshot Test', () => {
    const { toJSON } = render(
      <TopHeader opacity={1} onLayout={jest.fn()}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 64,
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
        </View>
      </TopHeader>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
