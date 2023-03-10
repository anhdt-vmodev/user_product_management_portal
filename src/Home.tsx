import { useAuthenticator } from '@aws-amplify/ui-react';
import { Container } from 'components/Container';
import { Navbar } from 'components/Navbar';

const Home = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  return (
    <>
      <Navbar />
      <Container>
        <main>
          <h1>Hello {user?.username}</h1>
        </main>
      </Container>
    </>
  );
};
export default Home;
