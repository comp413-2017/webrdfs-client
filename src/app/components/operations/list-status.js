import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Spacing, TextField } from 'react-elemental';
import Body from 'app/components/body';
import withForm from 'app/hoc/with-form';

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
