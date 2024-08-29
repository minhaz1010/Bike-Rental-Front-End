import { Mail, Phone, MapPin } from 'lucide-react';
// import profileImg from "../../assets/profile.jpeg"
import profileImg from "../../../assets/profile.jpeg"
import Loading from '@/components/Shared/Loading';
import { useGetMyProfileQuery } from '@/redux/features/profile/profileApi';

type TProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
};

const Profile = () => {
  const { data, isError, isLoading } = useGetMyProfileQuery(undefined)
  console.log(data, 'data');
  if (isError) {
    return <Loading message='Sorry Some Error Occured' />
  }
  if (isLoading) {
    return <Loading message='Loading' />
  }

  const profile: TProfile = data?.data;
  return (
    <div className="container roboto-condensed mx-auto    h-screen rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 ">
          <img
            src={profileImg}
            alt={profile.name}
            className="w-full  md:h-full object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-7xl   text-teal-700 mb-4">{profile.name}</h2>
          <div className="space-y-4">
            <div className="flex items-center text-teal-700">
              <Mail className="size-6 mr-3 text-indigo-500  flex-shrink-0" />
              <span className=" text-2xl md:text-3xl">{profile.email}</span>
            </div>
            <div className="flex items-center text-teal-700">
              <Phone className="size-6 mr-3 text-indigo-500 flex-shrink-0" />
              <span className='text-2xl md:text-3xl'>{profile.phone}</span>
            </div>
            <div className="flex items-center text-teal-700">
              <MapPin className="size-6 mr-3 text-indigo-500 flex-shrink-0" />
              <span className='text-2xl md:text-3xl'>{profile.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;