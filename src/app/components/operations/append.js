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
    const { makeRequest, form: { path = '' } } = this.props;
    const { file: text } = this.state;

    makeRequest({
      endpoint: `/webhdfs/v1${path}`,
      method: 'POST',
      body: text,
      qs: {
        op: 'APPEND',
      },
    });
  };

  handleFileUpload = (event) => {
    const fileReader = new FileReader();
    const raw = event.target.files[0];
    fileReader.readAsText(raw);
    fileReader.onload = () => {
      this.setState({ file: fileReader.result });
    };
  };

  render() {
    const { handleChange, form: { path = '' } } = this.props;

    return (
      <Body
        title={'Append'}
        subtitle={'Append a string an existing RDFS file'}
      >

        <Spacing bottom>
          <input
            onChange={this.handleFileUpload}
            type="file"
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
