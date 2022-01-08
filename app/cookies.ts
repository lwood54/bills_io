import { createCookie } from 'remix';

export let supabaseToken = createCookie('sb:token', {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 604_800,
});
