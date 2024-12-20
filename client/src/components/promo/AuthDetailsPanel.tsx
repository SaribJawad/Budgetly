import FeaturesSection from "../ui/FeaturesSection";
import loginIlustrationPng from "../../assets/images/loginIlustrationPng.png";

function AuthDetailsPanel() {
  return (
    <div className=" w-[50%] hidden lg:flex items-center flex-col justify-center gap-5">
      <div className="flex flex-col items-center gap-3 ">
        <h1 className="text-5xl font-bold">Budegtly.</h1>
        <p className="text-sm text-zinc-500">
          Manage your finance with budegtly
        </p>
      </div>
      <img className="w-[390px]" src={loginIlustrationPng} alt="" />
      <FeaturesSection />
    </div>
  );
}

export default AuthDetailsPanel;
