interface SettingPageNavigationProps {
  activeTab: "updateInformation" | "changePassword";
  handleTabClick: (tab: "updateInformation" | "changePassword") => void;
}

function SettingPageNavigation({
  activeTab,
  handleTabClick,
}: SettingPageNavigationProps) {
  return (
    <div className="grid grid-cols-2  py-3 ">
      <button
        onClick={() => handleTabClick("updateInformation")}
        className={`${
          activeTab === "updateInformation" ? "bg-[#917FFF]" : ""
        } p-2  font-semibold text-sm md:text-base `}
      >
        Update information
      </button>
      <button
        onClick={() => handleTabClick("changePassword")}
        className={`${
          activeTab === "changePassword" ? "bg-[#917FFF]" : ""
        } p-2 font-semibold  text-sm md:text-base  `}
      >
        Change password
      </button>
    </div>
  );
}

export default SettingPageNavigation;
