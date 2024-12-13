import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../utils/validation';

interface LoginForm {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>();
  const { login, currentUser } = useStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const onSubmit = (data: LoginForm) => {
    const success = login(data.username, data.password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('root', {
        type: 'manual',
        message: 'Invalid username or password'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full p-6 md:p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex items-center justify-center bg-primary-800 p-4 rounded-lg">
              <span className="text-white text-3xl font-bold">PS</span>
            </div>
            <span className="ml-3 text-3xl font-bold text-primary-800">HEALTHCARE</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-sm text-red-600 text-center">{errors.root.message}</p>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-800 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};