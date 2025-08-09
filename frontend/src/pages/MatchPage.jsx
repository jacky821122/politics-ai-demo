import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  max-width: 600px;
`;

const MatchPage = () => {
  return (
    <Container>
      <Title>Anonymous Matching</Title>
      <Message>
        This page is reserved for future implementation of anonymous political matching.
        <br />
        <br />
        Coming soon...
      </Message>
    </Container>
  );
};

export default MatchPage;
