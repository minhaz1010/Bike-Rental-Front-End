import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useChangePasswordMutation } from '@/redux/features/profile/profileApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { logOutAUser } from '@/redux/features/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { TPasswordFormInputs, TPasswordSchema } from '@/types/schema.type';



const UpdatePasswordComponent: React.FC = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<TPasswordFormInputs>({
    resolver: zodResolver(TPasswordSchema),
  });


  const [sendSecrets,] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<TPasswordFormInputs> = async (data) => {
    const secrets = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword
    }
    try {
      const response = (await sendSecrets(secrets));
      if (!response.error) {

        toast.success('Password Changed Successfully', {
          position: "top-right",
          duration: 2000
        })
        dispatch(logOutAUser())
        navigate("/login")
      } else {
        toast.error('Please Insert Your Correct Password', {
          position: "top-right",
          duration: 3000
        })
      }



      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // toast.error('Something Went Wrong')
      toast.error('something went wrong ', {
        position: 'top-right',
        duration: 3000,

      });
    }
  };

  return (
    <div className="roboto-condensed ml-6 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl mb-4 text-sky-500">Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-xl text-black">
              <Lock className="inline text-black size-8 mr-2" />
              Current Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"} // Toggle between password and text
                {...register("currentPassword")}
                className="w-full bg-gray-800 text-xl rounded px-4 py-2"
                placeholder="Current Password"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
              >
                {showOldPassword ? <EyeOff className="text-white" /> : <Eye className="text-white" />}
              </button>
            </div>
            {errors.currentPassword && <span className="text-red-500">{errors.currentPassword.message}</span>}
          </div>

          <div>
            <label className="block mb-2 text-xl text-black">
              <Lock className="inline text-black size-8 mr-2" />
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className="w-full bg-gray-800 text-xl rounded px-4 py-2"
                placeholder="New Password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-white"
              >
                {showNewPassword ? <EyeOff className="text-white" /> : <Eye className="text-white" />}
              </button>
            </div>
            {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
          </div>

          <div>
            <label className="block mb-2 text-xl text-black">
              <Lock className="inline text-black size-8 mr-2" />
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmNewPassword")}
                className="w-full bg-gray-800 text-xl rounded px-4 py-2"
                placeholder="Confirm New Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-white"
              >
                {showConfirmPassword ? <EyeOff className="text-white" /> : <Eye className="text-white" />}
              </button>
            </div>
            {errors.confirmNewPassword && <span className="text-red-500">{errors.confirmNewPassword.message}</span>}
          </div>

          // * {/* Submit Button */}

          <div>
            <button type="submit" className="bg-sky-500 hover:bg-sky-700 transition-colors  text-xl text-white  py-2 px-4 rounded">
              Change Password
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdatePasswordComponent;
