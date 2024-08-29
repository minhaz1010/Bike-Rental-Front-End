import { Button } from '@/components/ui/button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import bikeIcon from '../../assets/motorcycle.png';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { logOutAUser } from '@/redux/features/auth/authSlice';

const LargeNavBar = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logOutAUser());
    navigate('/');
  };

  const navItems = token
    ? [
      { path: '/', label: 'Home' },
      { path: "/about", label: "About us" },
      { path: "/all-bikes", label: "All Bikes" },
      { path: '/dashboard/available-bikes', label: 'Dashboard' },
      { path: '/logout', label: 'Log Out', onClick: handleLogout },
    ]
    : [
      { path: '/', label: 'Home' },
      { path: "/about", label: "About us" },

      { path: "/all-bikes", label: "All Bikes" },
      { path: '/signup', label: 'Sign Up' },
      { path: '/login', label: 'Log In' },
    ];

  return (
    <div className='mr-4 hidden gap-2 new-amsterdam-regular md:flex justify-between items-center w-full my-3'>
      <div className='ml-7'>
        <Link to='/' className='text-orange-400'>
          <img src={bikeIcon} alt='bike-icon' className='size-14' />
        </Link>
      </div>
      <nav id='navbar' className='flex gap-2 mr-7 '>
        {navItems.map((item) => (
          item.label === 'Log Out' ? (
            <Button
              key={item.path}
              onClick={item.onClick}
              variant='link'
              className='text-2xl duration-300 transition ease-in-out'
            >
              {item.label}
            </Button>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-xl duration-300 delay-100 transition ease-in-out ${isActive ? 'text-blue-500' : 'hover:text-blue-500'
                }`
              }
            >
              {({ isActive }) => (
                <Button
                  variant={!isActive ? 'link' : undefined}
                  className='text-2xl duration-300 transition ease-in-out'
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          )
        ))}
      </nav>
    </div>
  );
};

export default LargeNavBar;