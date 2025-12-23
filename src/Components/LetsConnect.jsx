import { MdArrowForward } from 'react-icons/md';

export default function LetsConnect() {
  return (
    <div className=" absolute space-x-2 text-center font-bold flex flex-col justify-center items-center">
      <div className="text-5xl text-white group-hover:translate-x-4  group-hover:scale-105  transition-all duration-500 ease-in-out">
        <MdArrowForward />
      </div>
    </div>
  );
}
