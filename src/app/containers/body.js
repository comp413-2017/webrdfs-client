import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Spacing, Text } from 'react-elemental';
import time from 'time-func';
import Append from 'app/components/operations/append';
import Create from 'app/components/operations/create';
import Delete from 'app/components/operations/delete';
import ListStatus from 'app/components/operations/list-status';
import Mkdir from 'app/components/operations/mkdir';
import Read from 'app/components/operations/read';
import Rename from 'app/components/operations/rename';
import Response from 'app/components/response';
import {
  OP_CREATE,
  OP_DELETE,
  OP_MKDIR,
  OP_READ,
  OP_RENAME,
  OP_APPEND,
  OP_LISTSTATUS,
} from 'app/util/operations';
import resource from 'app/util/resource';

const identity = (val) => val;

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
    const { transform = identity, ...resourceOpts } = opts;
    const { setIsLoading } = this.props;

    setIsLoading(true);
    time((done) => resource(resourceOpts, (err, resp) => {
      this.setState({ resp: transform(resp) });
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
      [OP_APPEND]: <Append makeRequest={this.makeRequest} />,
      [OP_LISTSTATUS]: <ListStatus makeRequest={this.makeRequest} />,
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
          <Spacing bottom>
            <Response resp={resp} />
          </Spacing>
        )}

        {opComponent[selectedOp] || placeholder}
      </div>
    );
  }
}

export default BodyContainer;
