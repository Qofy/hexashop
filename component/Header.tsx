import Image from "next/image"
import { content } from "./componentDatas/content_context"
import Link from "next/link"

export default function Header() {
  const {Header} = content
  return (
    <header className="flex items-center justify-between h-20 w-full bg-header-bg text-text-color px-30">
        <div className="flex gap-1.5">
          <Link href="/home">          
            <Image src={Header.logo} 
          alt={Header.shopName}
          width={50}
          height={50}
          />
          </Link>
            <div className="flex flex-col ">
            <h1 className="font-bold">{Header.shopName}</h1>
            <p className="text-[0.7rem]">{Header.abt}</p>
            </div>
        </div>
        <div className="flex gap-6.5">
          {Header.nav.map((navs)=> <Link href={`/${navs.toLowerCase()}`} key={navs} className=""> {navs}</Link>)}
        </div>
    </header>
  )
};