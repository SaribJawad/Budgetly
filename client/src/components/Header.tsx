function Header() {
  return (
    <header className="flex w-full items-start justify-between pl-8">
      <div className="">
        <h1 className="font-bold">Welcome back, Username</h1>
        <p className="text-xs text-zinc-500">
          It is the best time to manage your finance
        </p>
      </div>
      <div className="border border-zinc-700 rounded-3xl flex items-center gap-2 p-1 pr-3 ">
        <img
          className="w-10 rounded-full"
          src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
          alt=""
        />
        <div className="flex items-start flex-col ">
          <h3 className="text-sm">Username</h3>
          <p className="text-xs text-zinc-500">username@example.com</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
