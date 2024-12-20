import { useAppSelector } from "@/app/hook";
import ChangeUserPasswordForm from "@/components/forms/ChangeUserPasswordForm";
import EditUserInformationForm from "@/components/forms/EditUserInformationForm";
import SettingPageNavigation from "@/components/navigation/SettingPageNavigation";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import useUpdateUserAvatar from "@/custom-hooks/user/useUpdateUserAvatar";
import useShowToast from "@/custom-hooks/useShowToast";
import { selectUser } from "@/features/auth/authSlice";
import { formatDistanceToNow } from "date-fns";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

function SettingPage() {
  const {
    mutateAsync: updateUserAvatar,
    isPending: isUpdateUserAvatarPending,
  } = useUpdateUserAvatar();
  const showToast = useShowToast();
  const user = useAppSelector(selectUser);

  const [activeTab, setActiveTab] = useState<
    "updateInformation" | "changePassword"
  >("updateInformation");

  const handleTabClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };

  const handleUpdateAvatarImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = e.target.files?.[0];

    if (image) {
      const validateAvatarTypes = ["image/jpeg", "image/png"];
      if (!validateAvatarTypes.includes(image.type)) {
        showToast({
          variant: "destructive",

          description: "Invalid file type. Please upload a JPEG or PNG image.",
        });
        return;
      }
      await updateUserAvatar(image);
    }
  };

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <div className="w-full h-full flex border-b border-zinc-800 flex-col items-center justify-center p-3 gap-4 ">
        <img
          className="sm:w-36 w-24 rounded-full "
          src={
            user?.avatar ||
            "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
          }
          alt=""
        />

        <input
          disabled={isUpdateUserAvatarPending}
          type="file"
          id="avatarInput"
          className="hidden"
          onChange={handleUpdateAvatarImage}
        ></input>
        <div className="text-center relative">
          <button
            disabled={isUpdateUserAvatarPending}
            onClick={() => document.getElementById("avatarInput")?.click()}
            className="absolute top-[-90%] right-[0%] p-[6px] bg-[#917FFF] rounded-full"
          >
            {isUpdateUserAvatarPending ? (
              <LoadingSpinner />
            ) : (
              <Pencil size={18} />
            )}
          </button>
          <h1 className="text-2xl font-semibold capitalize">{`${user?.firstName} ${user?.lastName}`}</h1>
          <p className="text-sm text-zinc-500">
            {" "}
            {user?.createdAt
              ? `Joined ${formatDistanceToNow(new Date(user.createdAt), {
                  addSuffix: true,
                })}`
              : "Join date not available"}
          </p>
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
