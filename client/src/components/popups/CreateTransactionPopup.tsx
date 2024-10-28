import { motion } from "framer-motion";
import CreateTransactionForm from "../forms/CreateTransactionForm";

interface CreateTransactionPopupProps {
  onClose: () => void;
}

function CreateTransactionPopup({ onClose }: CreateTransactionPopupProps) {
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
      className="fixed inset-0  bg-black bg-opacity-80 z-10"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
    >
      <div
        onClick={handlePopupClick}
        className="min-w-[400px] w-[50%] h-auto bg-black z-20 border border-zinc-700 absolute top-1/2 left-1/2 rounded-lg transform -translate-x-1/2 -translate-y-1/2 px-5 py-2 flex flex-col gap-8"
      >
        <div className="flex items-center flex-col ">
          <h3 className="font-semibold">Adding a new Transaction</h3>
          <p className="text-xs text-zinc-500">Please fill in the form below</p>
        </div>
        <CreateTransactionForm />
      </div>
    </motion.div>
  );
}

export default CreateTransactionPopup;
