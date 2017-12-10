import React, { Component } from 'react';
import { LoadingBar, Spacing } from 'react-elemental';
import Header from 'app/components/header';
import Sidebar from 'app/components/sidebar';
import BodyContainer from 'app/containers/body';

class RootContainer extends Component {
  state = { selectedOp: null, isLoading: false };

  setSelectedOp = (op) => this.setState({ selectedOp: op });

  setIsLoading = (isLoading) => this.setState({ isLoading });

  render() {
    const { selectedOp, isLoading } = this.state;

    return (
      <div>
        <Spacing size="large" bottom>
          <Header />
          {isLoading && <LoadingBar position="absolute" />}
        </Spacing>

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
            <BodyContainer
              selectedOp={selectedOp}
              setIsLoading={this.setIsLoading}
            />
          </div>
        </Spacing>
      </div>
    );
  }
}

export default RootContainer;
