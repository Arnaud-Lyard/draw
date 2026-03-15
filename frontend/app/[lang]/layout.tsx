import { UserProvider } from "@/contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";

export default async function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      {children}
      <ToastContainer />
    </UserProvider>
  );
}
