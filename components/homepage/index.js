import React from 'react';
import styled from 'styled-components/native';

import { HomePageStyles, Title, Logo } from './style.js';
import logoImage from './logo.png';

class HomePage extends React.Component {
  render() {
    return (
      <HomePageStyles>
        <Logo source={logoImage}></Logo>
        <Title>Welcome to Duet</Title>
      </HomePageStyles>
    );
  }
}

export default HomePage;
