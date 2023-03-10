import { Button, TextField } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { ROUTES } from 'myConstants';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginProps {
  children?: Element;
}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async () => {
    try {
      setLoading(true);
      await Auth.signIn(username, password);
      window.location.href = ROUTES.home;
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, [username, password]);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      signIn();
    },
    [signIn]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-4 mx-auto my-4 w-[400px]  ">
        <h2 className="font-bold mb-6 text-2xl">Login</h2>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <br />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <br />

        <br />
        <div className="flex justify-center gap-2 ">
          <Button isLoading={loading} variation="primary" type="submit">
            Login
          </Button>
        </div>
        <div className=" text-center my-5">
          Don't have an account?{' '}
          <Link to={ROUTES.signup}>
            <span className="text-blue-500">Signup</span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export { Login };
