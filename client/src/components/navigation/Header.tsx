import { Link } from "react-router-dom";

interface HeaderProps {
  heading: String;
  note: String;
}

function Header({ heading, note }: HeaderProps) {
  return (
    <header className="flex w-full items-start justify-between pl-8">
      <div>
        <h1 className="font-bold text-2xl">{heading}</h1>
        <p className="text-sm text-zinc-500">{note}</p>
      </div>

      <div className=" flex items-center  ">
        <Link to={"/"}>
          <img
            className="w-14 rounded-full"
            src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
            alt=""
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
