import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface GoalCardPopupProps {
  handleCloseGoalPopup: () => void;
}

function GoalCardPopup({ handleCloseGoalPopup }: GoalCardPopupProps) {
  const [addSaveAmount, setAddSaveAmount] = useState<boolean>(false);
  const [savedAmount, setSavedAmount] = useState<number>(0);
  const fadeInVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: -20 },
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(savedAmount);
    setAddSaveAmount(false);
  };

  return (
    <motion.div
      onClick={handleCloseGoalPopup}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
      className="fixed  top-5   left-0 transform -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-80 z-30 h-full  w-full  "
    >
      <div
        className="w-auto flex flex-col items-center gap-6 p-4  h-auto bg-black border border-zinc-800 rounded-lg absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
        onClick={handlePopupClick}
      >
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-2xl font-semibold">MacBook Pro</h2>
            <span className=" text-sm text-zinc-500">
              Due date - 7 oct 2024
            </span>
          </div>
          <Button
            onClick={handleCloseGoalPopup}
            variant="ghost"
            className="w-1 h-8"
          >
            <X />
          </Button>
        </div>
        <div className="flex flex-col gap-7 items-center">
          {/* radial progress */}
          <div
            className="radial-progress text-[#917FFF] "
            style={
              {
                "--value": 70,
                "--size": "12rem",
                "--thickness": "1rem",
              } as React.CSSProperties
            }
            role="progressbar"
          >
            <span className="text-white text-xl font-bold">$124</span>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-md text-zinc-500">Last added amount</h3>
            <span className="text-lg font-semibold">100</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {addSaveAmount ? (
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-center gap-3"
            >
              <input
                value={savedAmount}
                onChange={(e) => setSavedAmount(Number(e.target.value))}
                className="border border-zinc-800 bg-black rounded-lg h-10 outline-none p-2"
                type="number"
              />
              <Button size="sm" className="bg-[#917FFF]">
                Add
              </Button>
            </form>
          ) : (
            <Button
              onClick={() => setAddSaveAmount((prev) => !prev)}
              size="lg"
              className="bg-[#917FFF]"
            >
              Add saved amount
            </Button>
          )}
          <div className="flex items-center gap-3">
            <Button size="lg" variant="ghost">
              Set goal as reached
            </Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GoalCardPopup;
