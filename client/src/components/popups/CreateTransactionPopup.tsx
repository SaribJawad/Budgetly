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
      className="fixed  top-5 left-0 transform -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-80 z-30 h-full  w-full  "
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
    >
      <div
        onClick={handlePopupClick}
        className="md:min-w-[450px] w-[30%] md:h-auto min-w-[350px] h-auto bg-black z-20 border border-zinc-700 absolute top-1/2 left-1/2 rounded-lg transform -translate-x-1/2 -translate-y-1/2 py-8 px-5 flex flex-col gap-8"
      >
        <div className="flex items-center flex-col ">
          <h3 className="font-semibold text-2xl">Adding a new Transaction</h3>
          <p className="text-sm text-zinc-500">Please fill in the form below</p>
        </div>
        <CreateTransactionForm />
      </div>
    </motion.div>
  );
}

export default CreateTransactionPopup;
