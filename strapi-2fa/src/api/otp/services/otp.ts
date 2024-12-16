import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::otp.otp", ({ strapi }) => ({
  async register(ctx, next) {
    await strapi.controllers["plugin::users-permissions.auth"].register(
      ctx,
      next
    );
  },

  async login(ctx, next) {
    const provider = ctx.params.provider || "local";

    await strapi.controllers["plugin::users-permissions.auth"].callback(
      ctx,
      next
    );

    if (provider === "local" || provider === "email") {
      // ... your login logic here, including OTP generation and verification
    }
  },

  // ... other functions for verifying OTP, generating TOTP secrets, etc.
}));