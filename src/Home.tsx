import { Authenticator } from '@aws-amplify/ui-react';
import { Container } from 'components/Container';
import { Navbar } from 'components/Navbar';
import { ROUTES } from 'myConstants';
import { Navigate } from 'react-router-dom';

const Home = () => {
  return (
    <Authenticator
      initialState="signUp"
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <Navigate to={ROUTES.login} />
              </>
            );
          },
        },
      }}
    >
      {({ signOut, user }) => (
        <>
          <Navbar type="loggedin" />
          <Container>
            <main>
              <h1>Hello {user?.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          </Container>
        </>
      )}
    </Authenticator>
  );
};
export default Home;
