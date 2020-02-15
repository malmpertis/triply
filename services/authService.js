import { Auth } from 'aws-amplify';

const signIn = async (email, password) => {
  try {
    await Auth.signIn(email, password);
  } catch (e) {
    console.log(e);
  }
};

const signUp = async (username, password) => {
  try {
    await Auth.signUp({ username, password });
    return;
  } catch (e) {
    console.log(e);
  }
};

const confirmSignUp = async (email, code) => {
  try {
    await Auth.confirmSignUp(email, code, {
      forceAliasCreation: true
    });
    return;
  } catch (e) {
    console.log(e);
  }
};

const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (e) {
    throw new Error(e);
  }
};

const checkAuth = async () =>
  Auth.currentAuthenticatedUser()
    .then((user) => {
      const { attributes, signInUserSession } = user;
      // console.log(attributes);
      // console.log(signInUserSession.accessToken.jwtToken);
      return { attributes, jwtToken: signInUserSession.accessToken.jwtToken };
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

export { signIn, signOut, checkAuth, signUp, confirmSignUp };
