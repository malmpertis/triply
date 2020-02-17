import { Auth } from 'aws-amplify';

const signIn = async (email, password) => {
  await Auth.signIn(email, password);
};

const signUp = async (username, password) => {
  await Auth.signUp({ username, password });
};

const confirmSignUp = async (email, code) => {
  await Auth.confirmSignUp(email, code, {
    forceAliasCreation: true
  });
};

const signOut = async () => {
  await Auth.signOut();
};

const checkAuth = async () =>
  Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log(user);
      const { attributes, signInUserSession } = user;
      // console.log(attributes);
      // console.log(signInUserSession.accessToken.jwtToken);
      return { attributes, jwtToken: signInUserSession.accessToken.jwtToken };
    })
    .catch((error) => {
      throw Error(error);
    });

export { signIn, signOut, checkAuth, signUp, confirmSignUp };
