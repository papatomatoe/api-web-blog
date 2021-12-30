"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const getPostData = ({ id, title, content, section, created_at }) => ({
  id,
  title,
  content,
  sectionId: section?.id,
  sectionTitle: section?.title,
  createDate: created_at,
});

module.exports = {
  async find(ctx) {
    const postsData = await strapi.services.post.find();

    if (!postsData) return ctx.throw(404);

    const allPosts = postsData.map(getPostData);
    return allPosts;
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const postData = await strapi.services.post.findOne({ id });

    if (!postData) return ctx.throw(404);

    const post = getPostData(postData);
    return post;
  },

  async create(ctx) {
    const request = ctx.request.body;

    console.log(request);

    if (!request) return ctx.throw(404);
    if (!request?.title || !request?.content || !request?.sectionId)
      return ctx.throw(400);

    const section = await strapi.services.section.findOne({
      id: request.sectionId,
    });

    if (!section) return ctx.throw(400);

    const newPost = {
      title: request.title,
      content: request.content,
      section,
    };

    const savedPost = await strapi.services.post.create(newPost);

    console.log(savedPost);

    const post = getPostData(savedPost);

    return post;
  },
};
