import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import bikeLogo from '../../assets/motorcycle.png';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { logOutAUser } from '@/redux/features/auth/authSlice';

function SmallNavBar() {
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
      { path: '/all-bikes', label: 'All Bikes' },
      { path: '/dashboard/available-bikes', label: 'Dashboard' },
      { path: '/logout', label: 'Log Out', onClick: handleLogout },
    ]
    : [
      { path: '/', label: 'Home' },
      { path: "/about", label: "About us" },
      { path: '/all-bikes', label: 'All Bikes' },
      { path: '/signup', label: 'Sign Up' },
      { path: '/login', label: 'Log In' },
    ];

  return (
    <Sheet>
      <div className='flex justify-between items-center md:hidden p-4'>
        <Link to='/' className='text-orange-400 flex items-center'>
          <img src={bikeLogo} alt='bike-icon' className='size-20' />
        </Link>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <MenuIcon className='text-3xl size-16' />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent side='right' className='transition duration-1000 bg-[#EDEADE]'>
        <nav className='flex flex-col items-start font-[oswald] p-4 new-amsterdam-regular'>
          {navItems.map((item) => (
            item.label === 'Log Out' ? (
              <Button
                key={item.path}
                onClick={item.onClick}
                variant='link'
                className='text-xl duration-300 transition ease-in-out'
              >
                {item.label}
              </Button>
            ) : (
              <SheetTrigger key={item.path} asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-xl duration-300 transition ease-in-out ${isActive ? 'text-blue-500' : 'hover:text-orange-500'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <Button
                      variant={!isActive ? 'link' : undefined}
                      className='text-xl duration-300 transition ease-in-out'
                    >
                      {item.label}
                    </Button>
                  )}
                </NavLink>
              </SheetTrigger>
            )
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SmallNavBar;
