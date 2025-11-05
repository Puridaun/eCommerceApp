import { useAuth } from "../hooks/useAuth";

export const TestAuth = () => {
  const { user, loading, signUp } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <p>User: {user ? user.email : "Not logged in"}</p>
      <button
        onClick={() => signUp("test@test.com", "password123", "Test User")}
      >
        Test Sign Up
      </button>
    </div>
  );
};
