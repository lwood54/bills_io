import { User } from "@supabase/supabase-js";

const useIsAuthorized = (user: User) => {
  if (user?.aud === "authenticated") return true;
  return false;
};

export default useIsAuthorized;
