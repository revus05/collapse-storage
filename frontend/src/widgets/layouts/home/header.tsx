import Image from "next/image";
import Link from "next/link";
import { paths } from "shared/navigation/paths";
import logo from "../../../../public/logo.png";

export const Header = () => {
  return (
    <header className="border-b fixed bg-background/80 backdrop-blur-2xl w-full z-50">
      <div className="2xl:w-360 w-full 2xl:px-0 px-2 mx-auto flex justify-between items-center py-2 gap-32">
        <Link href={paths.orders} className="shrink-0 flex items-end gap-2">
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt="logo"
            className="h-8 w-fit select-none"
          />
          <span className="text-trim-both">Склад</span>
        </Link>
      </div>
    </header>
  );
};
