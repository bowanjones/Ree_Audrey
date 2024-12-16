export default {
  routes: [
    {
      method: "POST",
      path: "/auth/local/register",
      handler: "api::otp.otp.register",
      config: {
        auth: false,
        middlewares: ["plugin::users-permissions.rateLimit"],
        prefix: "",
      },
    },
    {
      method: "POST",
      path: "/auth/local",
      handler: "api::otp.otp.login",
      config: {
        auth: false,
        middlewares: ["plugin::users-permissions.rateLimit"],
        prefix: "",
      },
    },
    {
      method: "POST",
      path: "/auth/verify-code",
      handler: "api::otp.otp.verifyCode",
      config: {
        auth: false,
        middlewares: ["plugin::users-permissions.rateLimit"],
      },
    },
    
  ],
};