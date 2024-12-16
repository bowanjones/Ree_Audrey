import type { Core } from '@strapi/strapi';

export default {
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const userModel = strapi.plugin('users-permissions')?.contentTypes?.user;

    if (userModel && userModel.schema) {
      // Add custom fields safely to the schema attributes
      Object.assign(userModel.schema.attributes, {
        totpSecret: {
          type: 'string',
          private: true, // Not exposed in API responses
          configurable: false,
        },
        enableTotp: {
          type: 'boolean',
          default: false,
          configurable: false,
        },
      });
    } else {
      strapi.log.error('Unable to load users-permissions user model.');
    }
  },
};
