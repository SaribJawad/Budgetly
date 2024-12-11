import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useGetAuthStatus } from "@/custom-hooks/auth/useGetAuthStatus";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const { isLoading } = useGetAuthStatus();

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center ">
        <LoadingSpinner className="text-white" size={50} />
      </div>
    );
  }

  return children;
}

export default AuthProvider;
