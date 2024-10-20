import { LoginForm } from "@/components/forms/LoginForm";
import { Link } from "react-router-dom";
import loginIlustrationPng from "../assets/images/loginIlustrationPng.png";

function LoginPage() {
  return (
    <div className="h-screen w-full bg-black flex   text-white gap-10 p-5">
      <div className="w-[50%] flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold">Sign in</h2>
          <p className="text-xs text-zinc-500">
            Wellcome there! Sign in to continue with Budgetly
          </p>
        </div>
        <LoginForm />
        <div>
          <p className="text-xs text-zinc-500">
            Don't have an account?{" "}
            <Link to="">
              <span className="hover:text-white"> Sign up</span>
            </Link>
          </p>
        </div>
      </div>
      {/* right */}
      <div className=" w-[50%] flex items-center flex-col justify-center gap-5">
        <div className="flex flex-col items-center gap-3 ">
          <h1 className="text-4xl font-bold">Budegtly.</h1>
          <p className="text-xs text-zinc-500">
            Manage your finance with budegtly
          </p>
        </div>
        {/* feature */}
        <img className="w-[350px]" src={loginIlustrationPng} alt="" />

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h3 className="font-medium text-sm">Track Transactions</h3>
            <p className="text-xs text-zinc-500">
              Easily monitor your spending and income.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-medium text-sm">Achieve Saving Goals</h3>
            <p className="text-xs text-zinc-500">
              Set and reach your financial goals effortlessly.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-medium text-sm">View Analytics</h3>
            <p className="text-xs text-zinc-500">
              Gain insights into your financial habits.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-medium text-sm">Create Budgets</h3>
            <p className="text-xs text-zinc-500">
              Plan your expenses with custom budgets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
