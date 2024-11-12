import ChangeUserPasswordForm from "@/components/forms/ChangeUserPasswordForm";
import EditUserInformationForm from "@/components/forms/EditUserInformationForm";
import SettingPageNavigation from "@/components/navigation/SettingPageNavigation";
import { useToast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

function SettingPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "updateInformation" | "changePassword"
  >("updateInformation");

  const handleTabClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };

  const handleUpdateAvatarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (image) {
      const validateAvatarTypes = ["image/jpeg", "image/png"];

      if (!validateAvatarTypes.includes(image.type)) {
        toast({
          variant: "destructive",
          className: "  border border-red-800 rounded-lg p-5 shadow-xl",
          description: "Invalid file type. Please upload a JPEG or PNG image.",
        });
      }
    }
  };

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <div className="w-full h-full flex border-b border-zinc-800 flex-col items-center justify-center p-3 gap-4 relative">
        <img
          className="sm:w-36 w-24 rounded-full"
          src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
          alt=""
        />

        <input
          type="file"
          id="avatarInput"
          className="hidden"
          onChange={handleUpdateAvatarImage}
        />
        <button
          onClick={() => document.getElementById("avatarInput")?.click()}
          className="absolute top-52 right-[46%] p-[6px] bg-[#917FFF] rounded-full"
        >
          <Pencil size={18} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Sarib Jawad</h1>
          <p className="text-sm text-zinc-500">Joined 23-12-2024</p>
        </div>
      </div>

      <SettingPageNavigation
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />

      <div className=" w-full h-full  flex items-center justify-center p-3  ">
        {activeTab === "updateInformation" && <EditUserInformationForm />}
        {activeTab === "changePassword" && <ChangeUserPasswordForm />}
      </div>
    </div>
  );
}

export default SettingPage;
