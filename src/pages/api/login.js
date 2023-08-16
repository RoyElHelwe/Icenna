import { format } from 'url';

export default function handler(req, res) {
  const { body, query } = req;

  const redirectTo = format({
    pathname: '/login',
    query: {
      provider: 'google',
      auth_token: body?.credential,
      ...query,
    },
  });

  res.redirect(redirectTo);
}
