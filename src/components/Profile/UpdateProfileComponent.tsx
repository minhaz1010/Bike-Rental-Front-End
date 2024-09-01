import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone } from 'lucide-react';
import { FaAddressCard } from 'react-icons/fa';
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '@/redux/features/profile/profileApi';
import Loading from '../Shared/Loading';
import toast, { Toaster } from 'react-hot-toast';
import { TProfileFormInputs, TProfileSchema } from '@/types/schema.type';
import { TCustomProfile } from '@/types';






const UpdateProfileComponent: React.FC = () => {



  const { register, handleSubmit, formState: { errors } } = useForm<TProfileFormInputs>({
    resolver: zodResolver(TProfileSchema),
  });

  const { data, isError, isLoading } = useGetMyProfileQuery(undefined);

  const [sendData] = useUpdateMyProfileMutation();
  if (isError) {
    return <Loading message='Sorry Some Error Occured' />
  }
  if (isLoading) {
    return <Loading message='Loading' />
  }

  const profile: TCustomProfile = data?.data;


  const onSubmit: SubmitHandler<TProfileFormInputs> = async (data) => {
    const userInfo: Partial<TCustomProfile> = {
      name: data.fullName || "",
      email: data.email || "",
      phone: data.mobileNumber || "",
      address: data.address || ""
    }


    try {
      await sendData(userInfo);
      toast.success('Profile Updated Successfully', {
        position: 'top-right',
        duration: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // toast.error('Failed to update profile. Please try again.');
      toast.error('Failed to update.Please try again', {
        position: 'top-right',
        duration: 3000,
      });
    }

  };

  return (
    <div className="roboto-condensed   ml-6 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl mb-4 text-sky-500 uppercase">{profile.role} Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-xl text-black">
                <User className=" inline text-black size-8 mr-2" />
                Full Name
              </label>
              <input
                {...register("fullName")}
                defaultValue={profile.name}
                contentEditable={true}
                className="w-full bg-gray-800 text-xl rounded px-4 py-2"
                placeholder="Full Name"
              />
              {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
            </div>

            <div>
              <label className="block mb-2 text-x text-black">
                <Mail className="inline text-black size-8 mr-2" />
                Email
              </label>
              <input
                {...register("email")}
                defaultValue={profile.email}
                className="w-full bg-gray-800 text-xl rounded px-4 py-2"
                placeholder="Email"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block mb-2 text-xl text-black">
                <FaAddressCard className="inline text-black size-8 mr-2" />
                Address
              </label>
              <input
                {...register("address")}
                defaultValue={profile.address}
                className="w-full bg-gray-800 text-xl rounded px-4 py-2"
                placeholder="Student ID"
              />
            </div>

            <div>
              <label className="block mb-2 text-xl text-black">
                <Phone className="inline text-black size-8 mr-2" />
                Mobile Number
              </label>
              <input
                {...register("mobileNumber")}
                defaultValue={profile.phone}
                className="w-full bg-gray-800 text-xl rounded px-4 py-2"
                placeholder="Mobile Number"
              />
              {errors.mobileNumber && <span className="text-red-500">{errors.mobileNumber.message}</span>}
            </div>


            <div>
              <button type="submit" className="bg-sky-500 hover:bg-sky-700 transition-colors text-xl text-white  py-2 px-4 rounded">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster />

    </div>
  );
};

export default UpdateProfileComponent;
