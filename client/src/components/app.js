import React from 'react';

export class App extends React.Component {

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

