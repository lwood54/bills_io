import { User } from "@supabase/supabase-js";

const useIsAuthorized = (user: User) => {
  if (user?.role === "authenticated") return true;
  return false;
};

export default useIsAuthorized;
