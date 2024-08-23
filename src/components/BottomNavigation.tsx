import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
interface LinkItem {
  link: string;
  title: string;
  icon: string;
}
const links: LinkItem[] = [
  {
    link: "/home",
    title: "Home",
    icon: "solar:home-2-linear",
  },
  {
    link: "/search",
    title: "Search",
    icon: "solar:magnifer-linear",
  },
  {
    link: "/category",
    title: "Category",
    icon: "solar:box-minimalistic-linear",
  },
  {
    link: "/basket",
    title: "Cart",
    icon: "solar:cart-large-2-linear",
  },
  {
    link: "/profile",
    title: "Profile",
    icon: "solar:user-linear",
  },
];

const BottomNavigation = () => {
  const [activeItem, setActiveItem] = useState("/category");
  const curveRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleItemOnClick = (
    item: LinkItem,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (curveRef.current && bubbleRef.current) {
      setActiveItem(item.link);
      const positionOfTarget = e.currentTarget.getBoundingClientRect().x;
      const curveWidth = curveRef.current.clientWidth;
      const bgPosition = ((positionOfTarget + 42) / curveWidth) * 100;
      const revertedBgPosition = (bgPosition - 100) * -1;
      curveRef.current.style.backgroundPositionX = revertedBgPosition + "%";
      bubbleRef.current.style.left = positionOfTarget + 16 + "px";
    }
  };

  return (
    <div className="w-full   h-16 absolute bottom-0 bg">
      <div
        ref={curveRef}
        className={` absolute transition-all bottom-0 bg-[url('/asset/BottomNavigationBg.svg')] bg-cover bg-center w-full h-full  `}
      >
        <div
          ref={bubbleRef}
          className="absolute w-12 h-12 rounded-full -top-7 bg-purple-700  transition-all"
        ></div>
      </div>
      <div className="absolute z-10 flex items-end h-full ">
        {links.map((linkItem) => {
          const isActive = activeItem == linkItem.link;

          return (
            <div
              onClick={(e) => handleItemOnClick(linkItem, e)}
              className={`w-20 ${
                isActive ? "h-20 text-slate-100" : "h-10 text-slate-400 "
              } overflow-hidden  flex items-center flex-col transition-all`}
              key={linkItem.link}
            >
              <Icon icon={linkItem.icon} className="min-w-6 min-h-6 " />
              <span className="mt-6">{linkItem.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
