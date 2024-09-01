import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import signUpGif from "../../assets/new-sign-up.jpg";
import { useUserSignUpApiMutation } from '@/redux/features/auth/authApi';
import { TSignUpFormValues, TSignUpschema } from '@/types/schema.type';



const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormValues>({
    resolver: zodResolver(TSignUpschema),
  });

  const navigate = useNavigate();

  const [signUpData] = useUserSignUpApiMutation();

  const onSubmit = async (data: TSignUpFormValues) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address
    }

    await signUpData(userInfo).unwrap();
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row h-[80%] p-5">

      <div className="w-full lg:block overflow-hidden md:w-1/2 bg-gray-100 hidden p-4">
        <img
          src={signUpGif}
          alt="Sign-Up"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full lg:w-1/2 p-4 flex items-center  jersey-10-regular justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-5xl font-bold mb-6 text-center">Sign Up</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-3xl font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 text-3xl border   border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-2xl">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-3xl font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border text-3xl border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-2xl">{errors.email.message}</p>}
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
            {errors.password && <p className="text-red-500 text-2xl ">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-3xl font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              {...register('phone')}
              className="w-full px-3 py-2 text-3xl border border-gray-300 rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-2xl">{errors.phone.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-3xl font-medium mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              {...register('address')}
              className="w-full px-3 py-2 border text-3xl border-gray-300 rounded-md"
            />
            {errors.address && <p className="text-red-500 text-2xl ">{errors.address.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-3xl bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-xl">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 text-xl hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
