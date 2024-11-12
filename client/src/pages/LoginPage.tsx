import { LoginForm } from "@/components/forms/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="w-[50%] flex flex-col items-center justify-center gap-8 ">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold">Sign in</h2>
        <p className="text-sm text-zinc-500">
          Wellcome there! Sign in to continue with Budgetly
        </p>
      </div>
      <LoginForm />
      <div>
        <p className="text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link to="/auth/sign-up">
            <span className="hover:text-white"> Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
