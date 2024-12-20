import { SignUpFrom } from "@/components/forms/SignUpForm";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div className="w-[50%] flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-bold">Sign up</h2>
        <p className="md:text-sm text-xs text-zinc-500">
          Wellcome there! Sign up to continue with Budgetly
        </p>
      </div>
      <SignUpFrom />
      <div>
        <p className="text-sm text-zinc-500 text-center">
          Have an account?{" "}
          <Link to="/auth/login">
            <span className="hover:text-white">Login now</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
