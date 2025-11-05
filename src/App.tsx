import { Toaster } from "sonner";
import Navbar from "./components/navbar/Navbar";
import { useAuth } from "./hooks/useAuth";

export const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto p-4">
          <h2>
            {user
              ? `Bine ai venit ${user.user_metadata.full_name}`
              : "Conecteaza-te pentru a continua"}
          </h2>
        </main>
      </div>
    </>
  );
};
