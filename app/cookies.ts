import { createCookie } from 'remix';

export const supabaseToken = createCookie('sb:token', {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 604_800,
});
