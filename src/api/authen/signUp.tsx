import { Auth } from 'aws-amplify';

interface signUpParams {
  username: string;
  password: string;
  city: string;
  country: string;
  postcode: string;
  email: string;
}

export type TypeSignUpAttributes = {
  'custom:country': string;
  'custom:city': string;
  email: string;
};

export const signUp = async ({
  password,
  username,
  city,
  country,
  email,
}: signUpParams) => {
  try {
    const attributes: TypeSignUpAttributes = {
      'custom:city': city,
      'custom:country': country,
      email,
    };
    const data = await Auth.signUp({
      username,
      password,
      attributes: attributes,
      clientMetadata: {},

      autoSignIn: {
        enabled: true,
      },
    });
    const { user } = data;
    return { user, error: '' };
  } catch (error) {
    return { user: null, error };
  }
};
