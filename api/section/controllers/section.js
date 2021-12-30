"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const sectionsData = await strapi.services.section.find();

    if (!sectionsData) return ctx.throw(404);

    const sections = sectionsData.map(({ id, title }) => ({
      id,
      title,
    }));

    return sections;
  },
};
