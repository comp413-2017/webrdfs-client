import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Spacing, TextField } from 'react-elemental';
import Body from 'app/components/body';
import withForm from 'app/hoc/with-form';

class Rename extends Component {
  static propTypes = {
    makeRequest: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  handleSubmit = () => {
    const { makeRequest, form: { source = '', dest = '' } } = this.props;

    makeRequest({
      endpoint: `/webhdfs/v1${source}`,
      method: 'PUT',
      qs: {
        op: 'RENAME',
        destination: dest,
      },
    });
  };

  render() {
    const { handleChange, form: { source = '', dest = '' } } = this.props;

    return (
      <Body
        title={'Rename'}
        subtitle={'Rename an existing RDFS file'}
      >
        <form>
          <Spacing bottom>
            <TextField
              label={'Source file'}
              sublabel={'Path to the file to rename'}
              onChange={handleChange('source')}
              value={source}
            />
          </Spacing>

          <Spacing bottom>
            <TextField
              label={'Destination file'}
              sublabel={'Path to the target destination file'}
              onChange={handleChange('dest')}
              value={dest}
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

export default withForm(Rename);
