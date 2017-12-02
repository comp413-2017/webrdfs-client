import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Text } from 'react-elemental';
import time from 'time-func';
import Create from 'app/components/operations/create';
import Delete from 'app/components/operations/delete';
import Mkdir from 'app/components/operations/mkdir';
import Read from 'app/components/operations/read';
import Rename from 'app/components/operations/rename';
import {
  OP_CREATE,
  OP_DELETE,
  OP_MKDIR,
  OP_READ,
  OP_RENAME,
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

  state = { resp: null, duration: null };

  componentDidUpdate(prevProps) {
    if (this.props.selectedOp !== prevProps.selectedOp) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ resp: null, duration: null });
    }
  }

  makeRequest = (opts) => {
    const { setIsLoading } = this.props;

    setIsLoading(true);
    time((done) => resource(opts, (err, resp) => {
      this.setState({ resp });
      setIsLoading(false);
      done();
    }), (ret, duration) => this.setState({ duration }));
  };

  render() {
    const { selectedOp } = this.props;
    const { resp, duration } = this.state;

    const opComponent = {
      [OP_CREATE]: <Create makeRequest={this.makeRequest} />,
      [OP_DELETE]: <Delete makeRequest={this.makeRequest} />,
      [OP_MKDIR]: <Mkdir makeRequest={this.makeRequest} />,
      [OP_READ]: <Read makeRequest={this.makeRequest} />,
      [OP_RENAME]: <Rename makeRequest={this.makeRequest} />,
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
        {duration && (
          <Alert
            type="info"
            title="Request timing."
            message={`Round-trip request duration is ${duration} ms.`}
          />
        )}

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
