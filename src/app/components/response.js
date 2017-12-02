import React from 'react';
import PropTypes from 'prop-types';
import { colors, Spacing, Text } from 'react-elemental';

const Response = ({ resp: { headers, status, statusText, body } }) => (
  <Spacing
    style={{ backgroundColor: colors.greenLight }}
    top
    right
    bottom
    left
    padding
  >
    <Spacing size="tiny" bottom>
      <Text color={colors.green} bold>
        HTTP response
      </Text>
    </Spacing>

    <Spacing size="tiny" bottom>
      <Text color={colors.green}>
        {`HTTP/1.1 ${status} ${statusText}`}
      </Text>
    </Spacing>

    <Spacing size="tiny" bottom>
      {[...headers].map(([name, value]) => (
        <div key={name}>
          <Text color={colors.green} inline>
            {name}:&nbsp;
          </Text>
          <Text color={colors.green} inline>
            {value}
          </Text>
        </div>
      ))}
    </Spacing>

    <Text color={colors.green}>
      {body}
    </Text>
  </Spacing>
);

Response.propTypes = {
  resp: PropTypes.shape({
    headers: PropTypes.object.isRequired,
    status: PropTypes.number.isRequired,
    statusText: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Response;
