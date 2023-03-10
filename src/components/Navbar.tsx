import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { ROUTES } from 'myConstants';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toastError } from 'utils/toast';

interface NavbarProps {
  children?: Element;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const links: {
    text: string;
    href: string;
    onClick?: any;
  }[] = useMemo(() => {
    if (!user) {
      return [
        { href: ROUTES.login, text: 'Login' },
        { href: ROUTES.signup, text: 'Signup' },
      ];
    }
    return [
      { href: ROUTES.home, text: 'Home' },
      {
        href: ROUTES.products.list,
        text: 'Products',
      },
      {
        href: '#',
        text: 'Sign out',
        onClick: async () => {
          try {
            await Auth.signOut();
          } catch (error) {
            toastError('Signout error');
          }
        },
      },
    ];
  }, [user]);
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to={ROUTES.home}>
          <span className="flex items-center">
            <img
              src={`${process.env.PUBLIC_URL}/logo.jpg`}
              className="h-6 mr-3 sm:h-9"
              alt="Regv Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Regv
            </span>
          </span>
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map((link) => {
              return (
                <li key={link.text}>
                  <Link to={link.href}>
                    <span
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                      aria-current="page"
                      onClick={link.onClick}
                    >
                      {link.text}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
