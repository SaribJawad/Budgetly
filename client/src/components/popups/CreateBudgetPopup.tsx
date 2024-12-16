import { motion } from "framer-motion";
import CreateBudgetForm from "../forms/CreateBudgetForm";
import useCreateBudget, {
  CreateBudgetFormData,
} from "@/custom-hooks/budget/useCreateBudget";
import { X } from "lucide-react";

interface CreateBudgetPopupProps {
  onClose: () => void;
}

function CreateBudgetPopup({ onClose }: CreateBudgetPopupProps) {
  const { mutateAsync: createBudget, isPending: isCreateBudgetPending } =
    useCreateBudget();

  const fadeInVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCreateBudget = async (values: CreateBudgetFormData) => {
    await createBudget(values);
    onClose();
  };

  return (
    <motion.div
      onClick={!isCreateBudgetPending ? onClose : undefined}
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
        <div className="flex items-center  justify-between ">
          <div className="flex items-start flex-col">
            <h3 className="font-semibold text-2xl">Creating a new Budget</h3>
            <p className="text-sm text-zinc-500">
              Please fill in the form below
            </p>
          </div>
          <button
            disabled={isCreateBudgetPending}
            onClick={onClose}
            className=" p-1 rounded-lg hover:bg-zinc-900 transition-all duration-300"
          >
            <X />
          </button>
        </div>

        <CreateBudgetForm
          handleCreateBudget={handleCreateBudget}
          isCreateBudgetPending={isCreateBudgetPending}
        />
      </div>
    </motion.div>
  );
}

export default CreateBudgetPopup;
