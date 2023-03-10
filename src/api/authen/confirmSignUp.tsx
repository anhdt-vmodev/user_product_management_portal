import { Auth } from 'aws-amplify';

interface confirmSignUpParams {
  username: string;
  code: string;
}

export type TypeSignUpAttributes = {
  'custom:country': string;
  'custom:city': string;
  'custom:address': string;
  'custom:postcode': string;
  email: string;
};

export const confirmSignUp = async ({
  username,
  code,
}: confirmSignUpParams) => {
  try {
    await Auth.confirmSignUp(username, code);
    return { error: '' };
  } catch (error) {
    return { error };
  }
};
