export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS') || ["Yl8646SuG3M0c5cESeJiFg==","fYS3yR1gPATHYXqREG2U9Q==","yLwMUwJtTYf4bjoSwdc6Vg==","hdK1RrIz7V1jgW6jr/Ab4Q=="],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
