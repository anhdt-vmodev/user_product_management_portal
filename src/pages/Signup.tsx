import { Auth } from 'aws-amplify';
import { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phone_number, // optional - E.164 number convention
          address,
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }
  return (
    <div>
      <h1>HEllo</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <br />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <br />
      <input
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="phone number"
      />
      <br />
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="address"
      />
      <br />
      <button
        onClick={() => {
          signUp();
          alert('success');
        }}
      >
        Submit
      </button>
    </div>
  );
}
