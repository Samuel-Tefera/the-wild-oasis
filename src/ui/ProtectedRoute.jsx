import React, { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  console.log(isAuthenticated, isLoading);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      queryClient.removeQueries();
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, queryClient]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}
