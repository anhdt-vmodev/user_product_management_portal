import { Logger } from 'aws-amplify';
import { ROUTES } from 'myConstants';
const logger = new Logger('My-Logger');

export const authEventListener = (data: any) => {
  console.log('aaa listeneg');
  switch (data.payload.event) {
    case 'configured':
      console.log('aaa the Auth module is configured');
      break;
    case 'signIn':
      console.log('aaa user signed in');
      break;
    case 'signIn_failure':
      logger.error('user sign in failed');
      break;
    case 'signUp':
      console.log('aaa user signed up');
      break;
    case 'signUp_failure':
      logger.error('user sign up failed');
      break;
    case 'confirmSignUp':
      console.log('aaa user confirmation successful');
      break;
    case 'completeNewPassword_failure':
      logger.error('user did not complete new password flow');
      break;
    case 'autoSignIn':
      console.log('aaa auto sign in successful');
      window.location.href = ROUTES.home;
      break;
    case 'autoSignIn_failure':
      logger.error('auto sign in failed');
      break;
    case 'forgotPassword':
      console.log('aaa password recovery initiated');
      break;
    case 'forgotPassword_failure':
      logger.error('password recovery failed');
      break;
    case 'forgotPasswordSubmit':
      console.log('aaa password confirmation successful');
      break;
    case 'forgotPasswordSubmit_failure':
      logger.error('password confirmation failed');
      break;
    case 'tokenRefresh':
      console.log('aaa token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      logger.error('token refresh failed');
      break;
    case 'cognitoHostedUI':
      console.log('aaa Cognito Hosted UI sign in successful');
      break;
    case 'cognitoHostedUI_failure':
      logger.error('Cognito Hosted UI sign in failed');
      break;
    case 'customOAuthState':
      console.log('aaa custom state returned from CognitoHosted UI');
      break;
    case 'customState_failure':
      logger.error('custom state failure');
      break;
    case 'parsingCallbackUrl':
      console.log('aaa Cognito Hosted UI OAuth url parsing initiated');
      break;
    case 'userDeleted':
      console.log('aaa user deletion successful');
      break;
    case 'signOut':
      console.log('aaa user signed out');
      window.location.href = ROUTES.login;
      break;
  }
};
