import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import logInGif from "../../assets/new-login.jpeg";
import { useUserLogInApiMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hook';
import { logInAUser } from '@/redux/features/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';

const schema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Please Provide Your Password' }),
});

type FormValues = z.infer<typeof schema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [logInData] = useUserLogInApiMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const response = await logInData(userInfo).unwrap();

      if (response.success) {
        const accessToken = response.token;
        console.log('access token', accessToken);
        dispatch(logInAUser({ accessToken }));
        navigate('/dashboard/available-bikes', { state: { message: 'Login successful!' } });
        toast.success("Login successful!", {
          position: "top-right",
          duration: 2000,
        });
      } else {
        toast.error(response.message || "Invalid email or password", {
          position: "top-right",
          duration: 3000,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.data?.message || error.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:h-screen p-5 jersey-10-regular my-11">
      <div className="overflow-hidden lg:flex items-center justify-center bg-gray-100 hidden p-4">
        <img src={logInGif} alt="log-in" className='object-cover lg:w-3/4' />
      </div>
      <div className="w-full lg:w-1/2 p-4 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="font-bold mb-6 text-center text-5xl">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-3xl font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 text-3xl border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-xl">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-3xl font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 text-3xl border border-gray-300 rounded-md"
            />
            {errors.password && <p className="text-red-500 text-xl">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-3xl bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <p className="mt-4 text-center text-xl">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 text-xl hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
