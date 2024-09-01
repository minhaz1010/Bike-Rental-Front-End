


import { logOutAUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TDropdownItem, TNavItem } from '@/types';
import { decodeToken } from '@/utils/DecodeJwt';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';



const SideNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSmallDevice, setIsSmallDevice] = useState<boolean>(false);
  const token = useAppSelector((state) => state.auth.token);
  const payload = decodeToken(token as string);
  const { role } = payload;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = {
    role
  }

  useEffect(() => {
    const checkDeviceSize = () => {
      const isSmall = window.innerWidth < 1180;
      setIsSmallDevice(isSmall);
      setIsDrawerOpen(!isSmall);
    };

    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);

    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  const handleItemClick = (action?: () => void) => {
    if (isSmallDevice) {
      setIsDrawerOpen(false);
    }
    if (action) {
      action();
    }
  };

  const handleLogout = () => {
    dispatch(logOutAUser());
    toast.success('Logged out successfully!', {
      position: 'top-right',
      duration: 2000,
    });
    navigate('/login');
  };

  const userNavItems: TNavItem[] = [
    { text: 'Home', href: '/' },
    { text: 'Available Bikes', href: '/dashboard/available-bikes' },
    { text: 'Profile', dropdown: true },
    { text: 'Log Out', href: '', onClick: handleLogout },
  ];

  const adminNavItems: TNavItem[] = [
    { text: 'Home', href: '/' },
    { text: 'Available Bikes', href: '/dashboard/available-bikes' },
    { text: 'Profile', dropdown: true },
    { text: 'Bike Management', dropdown: true },
    { text: 'User Management', href: '/dashboard/user-management' },
    { text: 'Rent Management', href: '/dashboard/rent-management' },
    { text: 'Log Out', href: '', onClick: handleLogout },
  ];

  const userDropdownItems: TDropdownItem[] = [
    { text: 'My-Profile', href: '/dashboard/profile' },
    { text: 'Update-Profile', href: '/dashboard/update-profile' },
    { text: 'My-Rentals', href: '/dashboard/my-rentals' },
  ];

  const adminDropdownItems: TDropdownItem[] = [
    { text: 'My-Profile', href: '/dashboard/profile' },
    { text: 'Update-Profile', href: '/dashboard/update-profile' },
  ];

  const bikeManagementItems: TDropdownItem[] = [
    { text: 'Add Bike', href: '/dashboard/add-bike' },
    { text: 'Manage Bikes', href: '/dashboard/manage-bike' },

  ];

  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;
  const dropdownItems = user?.role === 'admin' ? adminDropdownItems : userDropdownItems;

  return (
    <>
      {isSmallDevice && !isDrawerOpen && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-[#EDEADE] rounded-md"
        >
          ☰
        </button>
      )}
      <aside
        className={`fixed left-0 z-10 py-11 px-3 ${isSmallDevice ? 'w-[80%]' : ''} h-screen overflow-y-auto new-amsterdam-regular bg-[#EDEADE] transition-transform duration-300 ease-in-out ${isSmallDevice && !isDrawerOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        aria-label="Sidebar"
      >
        {isSmallDevice && isDrawerOpen && (
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 mb-5 size-12 bg-red-500 text-white rounded-full"
          >
            ✕
          </button>
        )}
        <div className="h-full px-3 py-4">
          <ul className="space-y-2 font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.dropdown ? (
                  <>
                    <button
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <span className="flex-1 text-left text-2xl">{item.text}</span>
                    </button>
                    <ul className="py-2 ml-5 space-y-2">
                      {item.text === 'Profile'
                        ? dropdownItems.map((dropdownItem) => (
                          <li key={dropdownItem.href}>
                            <NavLink
                              to={dropdownItem.href}
                              onClick={() => handleItemClick()}
                              className={({ isActive }) =>
                                `flex items-center p-2 w-fit rounded-lg text-xl dark:text-white ${isActive
                                  ? 'bg-black text-white'
                                  : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                              }
                            >
                              {dropdownItem.text}
                            </NavLink>
                          </li>
                        ))
                        : item.text === 'Bike Management'
                          ? bikeManagementItems.map((bikeItem) => (
                            <li key={bikeItem.href}>
                              <NavLink
                                to={bikeItem.href}
                                onClick={() => handleItemClick()}
                                className={({ isActive }) =>
                                  `flex items-center p-2 w-fit rounded-lg text-xl dark:text-white ${isActive
                                    ? 'bg-black text-white'
                                    : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`
                                }
                              >
                                {bikeItem.text}
                              </NavLink>
                            </li>
                          ))
                          : null}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.href || '#'}
                    onClick={() => handleItemClick(item.onClick)}
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg w-fit dark:text-white ${item.href && isActive
                        ? 'bg-black text-white'
                        : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <span className="flex-1 text-2xl">{item.text}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Toaster />

      </aside>
    </>
  );
};

export default SideNavbar;