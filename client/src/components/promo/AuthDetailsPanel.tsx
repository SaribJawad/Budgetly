import FeaturesSection from "../ui/FeaturesSection";
import loginIlustrationPng from "../../assets/images/loginIlustrationPng.png";

function AuthDetailsPanel() {
  return (
    <div className=" w-[50%] flex items-center flex-col justify-center gap-5">
      <div className="flex flex-col items-center gap-3 ">
        <h1 className="text-4xl font-bold">Budegtly.</h1>
        <p className="text-xs text-zinc-500">
          Manage your finance with budegtly
        </p>
      </div>
      <img className="w-[350px]" src={loginIlustrationPng} alt="" />
      <FeaturesSection />
    </div>
  );
}

export default AuthDetailsPanel;
