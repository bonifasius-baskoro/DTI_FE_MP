export const BASE_URL = "http://localhost:8082";

export const API_URL = {
    auth: {
      login: "/api/v1/auth/login",
      logout: "/api/v1/auth/logout",
      register:"/api/v1/users/register",
      registerEO:"/api/v1/users/registerEO"
    },

    user: {
      detail: "/api/v1/users",
    },
  };