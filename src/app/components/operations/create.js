import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Spacing, TextField } from 'react-elemental';
import Body from 'app/components/body';
import withForm from 'app/hoc/with-form';

class Create extends Component {
  static propTypes = {
    makeRequest: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  handleSubmit = () => {
    const { makeRequest, form: { path = '' } } = this.props;

    makeRequest({
      endpoint: `/webhdfs/v1${path}`,
      method: 'PUT',
      qs: {
        op: 'CREATE',
      },
    });
  };

  render() {
    const { handleChange, form: { path = '' } } = this.props;

    return (
      <Body
        title={'Create'}
        subtitle={'Create a new file in RDFS'}
      >
        <form>
          <Spacing bottom>
            <TextField
              label={'Path'}
              sublabel={'Path within the filesystem to create a new file'}
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

export default withForm(Create);
