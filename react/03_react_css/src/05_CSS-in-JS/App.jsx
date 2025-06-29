import React, { PureComponent } from 'react';
import { AppWrapper, AppTitle } from './style';
import Home from './home';
import { ThemeProvider } from 'styled-components';

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      primaryColor: 'green',
      width: '30px',
      height: '30px',
      color: 'red',
    };
  }
  render() {
    return (
      <ThemeProvider theme={{ size: '30px', color: 'purple' }}>
        <AppWrapper
          primaryColor={this.state.primaryColor}
          width={this.state.width}
          height={this.state.height}
          color={this.state.color}
        >
          <h1>React App</h1>
          <AppTitle>hello</AppTitle>
          <span className='app-logo'></span>
          <Home />
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
