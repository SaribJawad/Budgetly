import { motion } from "framer-motion";
import EditWalletForm from "../forms/EditWalletForm";
import { X } from "lucide-react";
import { Wallet } from "@/@types/Types";
import useDeleteWallet from "@/custom-hooks/wallet/useDeleteWallet";
import useEditWallet from "@/custom-hooks/wallet/useEditWallet";

interface EditWalletPopupProps {
  onClose: () => void;
  wallet: Wallet;
}

function EditWalletPopup({ onClose, wallet }: EditWalletPopupProps) {
  const { mutateAsync: deleteWallet, isPending: isDeleteWalletPending } =
    useDeleteWallet();
  const { mutateAsync: editWallet, isPending: isEditWalletPending } =
    useEditWallet();

  const fadeInVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDeleteWallet = async (walletId: string) => {
    await deleteWallet({ walletId });
  };

  return (
    <motion.div
      onClick={
        !isDeleteWalletPending || !isEditWalletPending ? onClose : undefined
      }
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
      className="fixed  top-5    left-0 transform -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-80 z-30 h-full  w-full  "
    >
      <div
        onClick={handlePopupClick}
        className="w-auto py-5 px-5 flex flex-col gap-8 h-auto bg-black border border-zinc-800 rounded-lg absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className=" flex items-center justify-between">
          <div className="flex  flex-col">
            <h3 className="font-semibold text-2xl">Editing Wallet</h3>
            <p className="text-sm text-zinc-500">
              Please fill in the form below
            </p>
          </div>
          <button
            disabled={isDeleteWalletPending}
            onClick={onClose}
            className=" p-1 rounded-lg hover:bg-zinc-900 transition-all duration-300"
          >
            <X />
          </button>
        </div>
        <EditWalletForm
          onClose={onClose}
          wallet={wallet}
          handleDeleteWallet={handleDeleteWallet}
          isDeleteWalletPending={isDeleteWalletPending}
          isEditWalletPending={isEditWalletPending}
          editWallet={editWallet}
        />
      </div>
    </motion.div>
  );
}

export default EditWalletPopup;
