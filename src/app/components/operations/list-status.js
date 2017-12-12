import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Spacing, TextField } from 'react-elemental';
import humanize from 'humanize';
import Body from 'app/components/body';
import withForm from 'app/hoc/with-form';

const safeParseJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
};

// Format the response body as a list rather than a raw JSON object
const respTransform = ({ body, ...resp } = {}) => {
  const json = safeParseJSON(body);
  if (!json) {
    return { ...resp, body };
  }

  const { FileStatuses: { FileStatus: list } } = json;

  const formattedBody = list.map(({ modificationTime, length, path }) => [
    path,
    length,
    `Modified ${humanize.relativeTime(modificationTime / 1000)}`,
  ].join('    '));

  return { ...resp, body: list.length > 0 ? formattedBody : '(Empty directory)' };
};

class ListStatus extends Component {
  static propTypes = {
    makeRequest: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  handleSubmit = () => {
    const { makeRequest, form: { path = '' } } = this.props;

    makeRequest({
      endpoint: `/webhdfs/v1${path}`,
      method: 'GET',
      qs: {
        op: 'LISTSTATUS',
      },
      transform: respTransform,
    });
  };

  render() {
    const { handleChange, form: { path = '' } } = this.props;

    return (
      <Body
        title={'List Status'}
        subtitle={'List the contents of a directory within RDFS'}
      >
        <form>
          <Spacing bottom>
            <TextField
              label={'Path'}
              sublabel={'Path to a directory'}
              onChange={handleChange('path')}
              value={path}
            />
          </Spacing>

          <Button
            type="submit"
            text={'Submit'}
            onClick={this.handleSubmit}
          />
        </form>
      </Body>
    );
  }
}

export default withForm(ListStatus);
