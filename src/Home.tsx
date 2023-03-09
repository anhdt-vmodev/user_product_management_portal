import { Authenticator } from '@aws-amplify/ui-react';

const Home = () => {
  return (
    <Authenticator
      signUpAttributes={[
        'address',
        'birthdate',
        'email',
        'family_name',
        'gender',
        'given_name',
        'locale',
        'middle_name',
        'name',
        'nickname',
        'phone_number',
        'picture',
        'preferred_username',
        'profile',
        'updated_at',
        'website',
        'zoneinfo',
      ]}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {JSON.stringify(user)}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};
export default Home;
