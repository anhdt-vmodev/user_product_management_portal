import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';

const Home = ({ signOut, user }: any) => {
  return (
    <div>
      {' '}
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <h2>Amplify Todos</h2>
    </div>
  );
};
export default withAuthenticator(Home);
