export default ({ redirect, app, router, store }) => {
  return new Promise(resolve => {
    app.$auth.onAuthStateChanged(async () => {
      let isUser = await isLoggedIn(store);
      console.log("isuser");
      console.log(isUser);
      if (isUser) {
        resolve(redirect({path: '/'}))
      } else {
        resolve(redirect({path: 'login'}))
      }

      resolve();
    });
  });
};

const isLoggedIn = async store => {
  return store.state.auth.loggedIn;
};

const getUser = async store => {
  return store.state.auth.user;
};
