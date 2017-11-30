import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';

const Body = ({ title, subtitle, children }) => (
  <div>
    <Spacing size="large" bottom>
      <Text size="delta">{title}</Text>
      <Text size="iota" color="gray60">{subtitle}</Text>
    </Spacing>

    {children}
  </div>
);

Body.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Body;
