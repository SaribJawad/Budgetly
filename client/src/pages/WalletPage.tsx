import Header from "@/components/navigation/Header";

function WalletPage() {
  return (
    <div className=" w-full p-2  flex flex-col gap-3">
      <Header
        heading={"Wallet"}
        note={"Overview of your balance and accounts"}
      />
    </div>
  );
}

export default WalletPage;
