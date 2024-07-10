import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-3 px-4 w-full fixed x-0 y-0 flex justify-center items-center z-auto">
      <div className="max-w-7xl w-full flex justify-between items-center text-nowrap">
        <Link href="/" className="text-md sm:text-xl md:text-2xl">
          {" "}
          <b>GitLab</b> Insights
        </Link>

        <Link href="/">
          <div className="flex items-center ">
            <div className="ml-4 text-end mr-4 hidden sm:block">
              <h2 className="font-bold text-white-400 text-lg">Aditya Sahu</h2>
              <p className="text-gray-100">Intern</p>
            </div>
            <div className="relative">
              <Image
                className="h-16 w-16 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/men/24.jpg"
                width={64}
                height={64}
                alt="User Profile"
              />{" "}
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center"></div>
    </nav>
  );
}
