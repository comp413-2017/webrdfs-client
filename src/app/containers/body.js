import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Text } from 'react-elemental';
import Create from 'app/components/operations/create';
import Mkdir from 'app/components/operations/mkdir';
import {
  OP_CREATE,
  OP_MKDIR,
} from 'app/util/operations';
import resource from 'app/util/resource';

class BodyContainer extends Component {
  static propTypes = {
    selectedOp: PropTypes.string,
    setIsLoading: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedOp: null,
  };

  state = { resp: null };

  componentDidUpdate(prevProps) {
    if (this.props.selectedOp !== prevProps.selectedOp) {
      this.setState({ resp: null });  // eslint-disable-line react/no-did-update-set-state
    }
  }

  makeRequest = (opts) => {
    const { setIsLoading } = this.props;

    setIsLoading(true);
    resource(opts, (err, resp) => {
      this.setState({ resp });
      setIsLoading(false);
    });
  };

  render() {
    const { selectedOp } = this.props;
    const { resp } = this.state;

    const opComponent = {
      [OP_CREATE]: <Create makeRequest={this.makeRequest} />,
      [OP_MKDIR]: <Mkdir makeRequest={this.makeRequest} />,
    };

    const placeholder = (
      <div>
        <Text size="epsilon">
          Select an operation from the sidebar on the left.
        </Text>
      </div>
    );

    return (
      <div>
        {resp && (
          <Alert
            type="success"
            title={'Request completed.'}
            message={`Response: ${resp}`}
          />
        )}

        {opComponent[selectedOp] || placeholder}
      </div>
    );
  }
}

export default BodyContainer;
