import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Spacing, TextField } from 'react-elemental';
import Body from 'app/components/body';
import withForm from 'app/hoc/with-form';

class Append extends Component {
  static propTypes = {
    makeRequest: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  handleSubmit = () => {
    const { makeRequest, form: { path = '', user = '' } } = this.props;

    makeRequest({
      endpoint: `/webhdfs/v1${path}`,
      method: 'POST',
      qs: {
        op: 'APPEND',
        'user.name': user,
      },
    });
  };

  render() {
    const { handleChange, form: { path = '', user = '' } } = this.props;

    return (
      <Body
        title={'Append'}
        subtitle={'Append a string an existing RDFS file'}
      >
        <Spacing bottom>
          <TextField
            label={'Username'}
            sublabel={'Username of the user performing this operation'}
            onChange={handleChange('user')}
            value={user}
          />
        </Spacing>

        <Spacing bottom>
          <TextField
            label={'Path'}
            sublabel={'Path to an existing file to append contents to'}
            onChange={handleChange('path')}
            value={path}
          />
        </Spacing>

        <Button
          text={'Submit'}
          onClick={this.handleSubmit}
        />
      </Body>
    );
  }
}

export default withForm(Append);
