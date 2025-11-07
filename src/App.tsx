import { Toaster } from "sonner";
import Navbar from "./components/navbar/Navbar";
import { HomePage } from "./components/publicHompage/HomePage";
export const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <HomePage />
      </div>
    </>
  );
};
