import React, { Component } from 'react';
import { Spacing } from 'react-elemental';
import Header from 'app/components/header';
import Sidebar from 'app/components/sidebar';
import BodyContainer from 'app/containers/body';

class RootContainer extends Component {
  state = { selectedOp: null };

  setSelectedOp = (op) => this.setState({ selectedOp: op });

  render() {
    const { selectedOp } = this.state;

    return (
      <div>
        <Header />

        <Spacing size="huge" left right style={{ display: 'flex' }}>
          <div>
            <Spacing size="large" right>
              <Sidebar
                selectedOp={selectedOp}
                setSelectedOp={this.setSelectedOp}
              />
            </Spacing>
          </div>

          <div style={{ flexGrow: 1 }}>
            <BodyContainer selectedOp={selectedOp} />
          </div>
        </Spacing>
      </div>
    );
  }
}

export default RootContainer;
