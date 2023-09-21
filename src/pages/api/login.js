export default function handler(req, res) {
  res.redirect(307, `/login?auth_token=${req.body?.credential}`);
};
