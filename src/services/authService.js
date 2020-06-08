import { Auth } from 'aws-amplify';

const signIn = (email, password) => Auth.signIn(email, password);

const signUp = (username, password) => Auth.signUp({ username, password });

const confirmSignUp = (email, code) =>
  Auth.confirmSignUp(email, code, {
    forceAliasCreation: true
  });

const signOut = () => Auth.signOut();

const checkAuth = async () => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    const { attributes, signInUserSession } = response;
    return { attributes, jwtToken: signInUserSession.accessToken.jwtToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { signIn, signOut, checkAuth, signUp, confirmSignUp };
