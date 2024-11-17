import { useToast } from "@/hooks/use-toast";

interface showToastProps {
  variant?: "default" | "destructive";
  duration?: number;
  description: string;
}

const useShowToast = () => {
  const { toast } = useToast();

  return ({
    variant = "default",
    duration = 2000,
    description,
  }: showToastProps) => {
    toast({
      variant,
      className:
        variant === "default"
          ? " bg-black border-zinc-800 text-white rounded-lg p-5 shadow-xl"
          : "text-white rounded-lg p-5 shadow-xl",
      duration,
      description,
    });
  };
};

export default useShowToast;
