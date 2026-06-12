import Image from "next/image";
import HomePage from "./home/page";


export default function Home() {
  return (
    <div className="flex flex-col flex-1  bg-zinc-50 font-sans dark:bg-white text-black">
     <HomePage/>
    </div>
  );
}
