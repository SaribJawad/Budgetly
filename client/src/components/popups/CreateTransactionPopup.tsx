import { motion } from "framer-motion";
import CreateTransactionForm from "../forms/CreateTransactionForm";
import useAddTransactions, {
  AddTransactionFormData,
} from "@/custom-hooks/transactions/useAddTranscations";
import { X } from "lucide-react";

interface CreateTransactionPopupProps {
  onClose: () => void;
}

function CreateTransactionPopup({ onClose }: CreateTransactionPopupProps) {
  const { mutateAsync: addTransctions, isPending: addTransactionPending } =
    useAddTransactions();

  const fadeInVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCreateTranscations = async ({
    formData,
  }: AddTransactionFormData) => {
    await addTransctions({ formData });
    onClose();
  };

  return (
    <motion.div
      onClick={!addTransactionPending ? onClose : undefined}
      className="fixed  top-5 left-0 transform -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-80 z-30 h-full  w-full  "
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
    >
      <div
        onClick={handlePopupClick}
        className="md:min-w-[450px] w-[40%] md:h-auto min-w-[350px] h-auto bg-black z-20 border border-zinc-800 absolute top-1/2 left-1/2 rounded-lg transform -translate-x-1/2 -translate-y-1/2 py-8 px-5 flex flex-col gap-10"
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-start flex-col">
            <h3 className="font-semibold text-2xl">Adding a new Transaction</h3>
            <p className="text-sm text-zinc-500">
              Please fill in the form below
            </p>
          </div>

          <button
            disabled={addTransactionPending}
            onClick={onClose}
            className=" p-1 rounded-lg hover:bg-zinc-900 transition-all duration-300"
          >
            <X />
          </button>
        </div>
        <CreateTransactionForm
          handleCreateTranscations={handleCreateTranscations}
          isAddTransactionPending={addTransactionPending}
        />
      </div>
    </motion.div>
  );
}

export default CreateTransactionPopup;
