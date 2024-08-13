import {Context} from 'koa';
import {User} from "@sentry/types";
export default function (ctx: Context) {
  const { name, email, password } = ctx.request.body as User;
  if (!name || !email || !password) {
    ctx.throw(400, 'Please provide name, email and password');
  }

}
