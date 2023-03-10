import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { pause } from 'utils/testUtils';
import * as utilFns from '../api/authen/signUp';

import { SignUpProvider } from 'contexts/SignUpContext';
import awsExports from './../aws-exports';

import userEvent from '@testing-library/user-event';
import { Amplify, Auth } from 'aws-amplify';
import Signup from './Signup';

Amplify.configure(awsExports);

Auth.signUp = jest.fn().mockImplementation(() => {
  return new Promise((resolve) => {
    resolve({
      user: 0,
      error: '',
    });
  });
});

const renderComponent = async () => {
  render(
    <BrowserRouter>
      <SignUpProvider>
        <Signup />
      </SignUpProvider>
    </BrowserRouter>
  );

  expect(await screen.findByText('Signup')).toBeInTheDocument();
};

describe('test', () => {
  let mockedFnSignUp: jest.SpyInstance<void>;
  beforeEach(() => {
    mockedFnSignUp = jest.spyOn(utilFns, 'signUp') as any;
  });

  afterEach(() => {
    mockedFnSignUp.mockRestore();
  });

  it('signup success', async () => {
    mockedFnSignUp.mockImplementation(() => {
      return {
        user: {},
        error: '',
      };
    });
    renderComponent();
    const btn_submit_signup = await screen.findByTestId('btn_submit_signup');
    expect(btn_submit_signup).toBeInTheDocument();
    userEvent.click(btn_submit_signup);
    expect(
      await screen.findByTestId('confirm_signup_container')
    ).toBeInTheDocument();
  });

  it('signup failed', async () => {
    mockedFnSignUp.mockImplementation(() => {
      return {
        user: null,
        error: 'sign in failed',
      };
    });
    renderComponent();
    const btn_submit_signup = await screen.findByTestId('btn_submit_signup');
    expect(btn_submit_signup).toBeInTheDocument();
    userEvent.click(btn_submit_signup);

    await pause(300);
    expect(screen.queryByTestId('confirm_signup_container')).toBeNull();
  });
});
