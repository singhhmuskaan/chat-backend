export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', "19kNfnnv+Cq/XwjlKLuOsg=="),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', "2nioXdV5pPo72DQT30ETlA=="),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', "uuv/RRFg4c/2m1UmgiUxFw=="),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
