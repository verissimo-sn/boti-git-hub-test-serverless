import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #14213d;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column ;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const CardList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
`;