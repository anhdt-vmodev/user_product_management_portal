import { Authenticator } from '@aws-amplify/ui-react';
import VMOIcon from 'assets/icons/IconVMO';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from './Layout';
import DefaultUser from 'assets/images/defaultUser.png';
import * as React from 'react';

export const Header = () => {
  const [isShowMenu, setIsShowMenu] = React.useState<boolean>(false);

  const onMouseEnter = () => setIsShowMenu(true);
  const onMouseLeave = () => setIsShowMenu(false);

  const navigate = useNavigate();

  return (
    <Authenticator>
      {({ user, signOut }) => {
        return (
          <div className="bg-[#1D0C36] text-white w-full h-28 flex items-center justify-center relative">
            <Layout>
              <header className="flex justify-between relative">
                <Link to="/">
                  <VMOIcon />
                </Link>

                <div
                  className="flex space-x-5 items-center cursor-pointer relative"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <div className="w-10 h-10 sm:w-16 sm:h-16">
                    <img src={DefaultUser} alt="" width="100%" height="100%" />
                  </div>

                  {user?.username && (
                    <div className="text-xl">{user.username}</div>
                  )}

                  {isShowMenu && (
                    <div className="absolute -bottom-24 mt-2.5 right-0 z-10">
                      <div className="bg-[#1D0C36] rounded-b-md">
                        <div className="flex flex-col text-white rounded-b-md">
                          <Link
                            to="/profile"
                            className="pt-4 pb-2 px-6 hover:bg-gray-50 hover:text-black hover:rounded-t-md"
                          >
                            Profile
                          </Link>
                          <button
                            type="button"
                            onClick={async () => {
                              await signOut?.();
                              navigate('/');
                            }}
                            className="pb-4 px-6 pt-2 hover:bg-gray-50 hover:text-black whitespace-nowrap hover:rounded-b-md"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </header>
            </Layout>
          </div>
        );
      }}
    </Authenticator>
  );
};
