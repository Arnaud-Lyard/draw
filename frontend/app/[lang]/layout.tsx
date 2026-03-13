import { ConfigurationProvider } from "@/contexts/ConfigurationContext";
import { ToastContainer, toast } from "react-toastify";

export default async function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigurationProvider>
      {children}
      <ToastContainer />
    </ConfigurationProvider>
  );
}
