import { motion } from "framer-motion";
import CreateBudgetForm from "../forms/CreateBudgetForm";

interface CreateBudgetPopupProps {
  onClose: () => void;
}

function CreateBudgetPopup({ onClose }: CreateBudgetPopupProps) {
  const fadeInVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      onClick={onClose}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
      className="fixed  top-5    left-0 transform -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-80 z-30 h-full  w-full  "
    >
      <div
        className="w-auto py-5 px-5 flex flex-col gap-8 h-auto bg-black border border-zinc-800 rounded-lg absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
        onClick={handlePopupClick}
      >
        <div className="flex items-center flex-col ">
          <h3 className="font-semibold text-2xl">Creating a new Budget</h3>
          <p className="text-sm text-zinc-500">Please fill in the form below</p>
        </div>
        <CreateBudgetForm />
      </div>
    </motion.div>
  );
}

export default CreateBudgetPopup;