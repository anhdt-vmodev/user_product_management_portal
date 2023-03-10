import { Auth } from 'aws-amplify';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const [profile, setProfile] = React.useState<any>(null);

  const navigate = useNavigate();

  const getInfo = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      if (!attributes) {
        return navigate('/');
      }
      setProfile(attributes);
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <div className="py-8 max-w-4xl mx-auto">
          <h1 className="text-3xl mb-8">Profile</h1>

          {profile && (
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="username">Username:</label>
                <input
                  value={profile?.name || ''}
                  onChange={() => {}}
                  placeholder="Username"
                  id="username"
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor={profile?.email}>Email:</label>
                <input
                  value={profile?.email || ''}
                  onChange={() => {}}
                  placeholder="Email"
                  id={profile?.email}
                  disabled
                />
              </div>

              <div className="flex flex-col space-y-0.5">
                <label htmlFor={profile['custom:postcode']}>Postcode:</label>
                <input
                  value={profile['custom:postcode'] || ''}
                  onChange={() => {}}
                  placeholder="Postcode"
                  id={profile['custom:postcode'] || ''}
                  disabled
                />
              </div>

              <div className="flex flex-col space-y-0.5">
                <label htmlFor={profile['custom:address']}>Address:</label>
                <input
                  value={profile['custom:address']}
                  onChange={() => {}}
                  placeholder="address"
                  id={profile['custom:address']}
                  disabled
                />
              </div>

              <div className="flex flex-col space-y-0.5">
                <label htmlFor={profile['custom:city']}>City:</label>
                <input
                  value={profile['custom:city'] || ''}
                  onChange={() => {}}
                  placeholder="City"
                  id={profile['custom:city']}
                  disabled
                />
              </div>

              <div className="flex flex-col space-y-0.5">
                <label htmlFor={profile ? profile['custom:country'] : ''}>
                  Country:
                </label>
                <input
                  value={profile['custom:country'] || ''}
                  onChange={() => {}}
                  placeholder="Country"
                  id={profile['custom:country']}
                  disabled
                />
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};
