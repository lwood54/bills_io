export const PATH = {
  ROOT: "/",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  SIGN_OUT: "/signout",
  // PROFILE: '/profile',
  PROFILE: {
    VIEW: "/profile",
    EDIT: "/profile/:uuid/edit",
  },
  BILLS: {
    ADD: "/bills/add/modify",
    DELETE: "/bills/:uuid/remove",
    EDIT: "/bills/:uuid/modify",
    VIEW: "/bills/view",
  },
};
