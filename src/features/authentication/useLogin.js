import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      navigate('/dashboard');
    },

    onError: (err) => {
      console.log('Error =>', err);
    },
  });

  return { login, isLogin };
}
