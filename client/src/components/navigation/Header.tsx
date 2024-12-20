import { useAppSelector } from "@/app/hook";
import { selectUser } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";

interface HeaderProps {
  heading: String;
  note: String;
}

function Header({ heading, note }: HeaderProps) {
  const user = useAppSelector(selectUser);

  return (
    <header className="flex w-full items-start justify-between pl-8">
      <div>
        <h1 className="sm:font-bold sm:text-2xl text-lg font-semibold ">
          {heading}
        </h1>
        <p className="sm:text-sm text-xs text-zinc-500">{note}</p>
      </div>

      <div className=" flex items-center  ">
        <Link to={"/"}>
          <img
            className="sm:w-14 w-11 rounded-full"
            src={
              user?.avatar ||
              "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
            }
            alt=""
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
