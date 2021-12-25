import * as React from "react";
import { useAuth } from "../../contexts/Auth";

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  React.useEffect(() => {
    console.log("user info", user);
  }, [user]);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
    } catch (error) {
      console.log("error on logout", error);
    }
  };
  return (
    <div>
      {user?.aud === "authenticated" ? (
        <>
          <h1>You are looged in!!!</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h1>Not logged in yet...</h1>
      )}
    </div>
  );
};

export default Dashboard;
