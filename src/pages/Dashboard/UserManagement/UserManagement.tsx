import React from 'react';
import { useDeleteAUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/profile/profileApi';
import Loading from '@/components/Shared/Loading';
import toast, { Toaster } from 'react-hot-toast';

interface TUser {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery(undefined);
  const [updateUserRole,] = useUpdateUserRoleMutation();
  const [deleteAUser] = useDeleteAUserMutation()

  if (isLoading) return <Loading message='Loading' />;
  if (isError) return <Loading message='Some Error Occurred' />;

  const users: TUser[] = data?.data || [];

  const handleRoleChange = async (_id: string, newRole: string) => {
    try {
      const userInfo = {
        id: _id,
        role: newRole
      }
      await updateUserRole(userInfo);
      toast.success('Role Updated successfully!', {
        duration: 2000,
        position: "top-right"
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Some Error Occured', {
        duration: 2000,
        position: "top-right"
      })
    }
  };

  const handleDeleteUser = async (id: string) => {

    try {
      const res = await deleteAUser({ id }).unwrap()
      console.log(res, 'res');

      toast.success('User deleted successfully!', {
        duration: 2000,
        position: "bottom-right"
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Some Error Occured', {
        duration: 2000,
        position: "top-right"
      })
    }
  };

  return (
    <div className="p-4 roboto-condensed">
      <h1 className="text-3xl md:text-5xl mb-4 text-center">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-sky-700 uppercase leading-normal">
            <tr>
              <th className="py-2 px-3 md:py-3 md:px-6 text-left font-semibold text-sm md:text-2xl">Name</th>
              <th className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl hidden md:table-cell">Address</th>
              <th className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl hidden md:table-cell">Phone</th>
              <th className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl">Email</th>
              <th className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl">Role</th>
              <th className="py-2 px-3 md:py-3 md:px-6 text-center text-sm md:text-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs md:text-sm font-light">
            {users?.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl whitespace-nowrap">{user.name}</td>
                <td className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl hidden md:table-cell">{user.address}</td>
                <td className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl hidden md:table-cell">{user.phone}</td>
                <td className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl">{user.email}</td>
                <td className="py-2 px-3 md:py-3 md:px-6 text-left text-sm md:text-2xl">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border border-gray-300 rounded-md p-1 md:p-2 text-xs md:text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-2 px-3 md:py-3 md:px-6 text-center">

                  <button
                    className="bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded hover:bg-red-600 transition duration-200 text-xs md:text-sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />

    </div>
  );
};

export default UserManagement;