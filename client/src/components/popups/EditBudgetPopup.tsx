import { motion } from "framer-motion";
import EditBudgetForm from "../forms/EditBudgetForm";
import useDeleteBudget from "@/custom-hooks/budget/useDeleteBudget";
import { Budget } from "@/@types/Types";
import { X } from "lucide-react";
import useEditBudget, {
  EditBudgetData,
} from "@/custom-hooks/budget/useEditBudget";

interface EditBudgetPopupProps {
  onClose: () => void;
  budget: Budget;
}

function EditBudgetPopup({ onClose, budget }: EditBudgetPopupProps) {
  const { mutateAsync: deleteBudget, isPending: isDeleteBudgetPending } =
    useDeleteBudget();
  const { mutateAsync: editBudget, isPending: isEditBudgetPending } =
    useEditBudget();

  const fadeInVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDeleteBudget = async (budgetId: string) => {
    await deleteBudget(budgetId);
  };

  const handleEditBudget = async (values: EditBudgetData) => {
    await editBudget(values);
  };

  return (
    <motion.div
      onClick={
        !isDeleteBudgetPending || !isEditBudgetPending ? onClose : undefined
      }
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
        <div className="flex items-center justify-between ">
          <div className="flex items-start flex-col">
            <h3 className="font-semibold text-2xl">Editing Budget</h3>
            <p className="text-sm text-zinc-500">
              Please fill in the form below
            </p>
          </div>
          <button
            disabled={isDeleteBudgetPending || isEditBudgetPending}
            onClick={onClose}
            className=" p-1 rounded-lg hover:bg-zinc-900 transition-all duration-300"
          >
            <X />
          </button>
        </div>
        <EditBudgetForm
          handleDeleteBudget={handleDeleteBudget}
          isDeleteBudgetPending={isDeleteBudgetPending}
          budget={budget}
          isEditBudgetPending={isEditBudgetPending}
          handleEditBudget={handleEditBudget}
        />
      </div>
    </motion.div>
  );
}

export default EditBudgetPopup;
