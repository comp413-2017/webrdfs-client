import React from 'react';
import { colors, Spacing, Text } from 'react-elemental';

const Header = () => (
  <Spacing
    size="large"
    style={{
      backgroundColor: colors.blueDark,
      width: '100%',
    }}
    bottom
  >
    <div
      style={{
        maxWidth: '600px',
      }}
    >
      <Spacing size="huge" left right top bottom padding>
        <Text size="beta" color="gray5">webRDFS client</Text>
      </Spacing>
    </div>
  </Spacing>
);

export default Header;
