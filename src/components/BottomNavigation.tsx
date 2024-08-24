import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
interface LinkItem {
  id: string;
  link: string;
  title: string;
  icon: string;
}
const links: LinkItem[] = [
  {
    id: "1",
    link: "/home",
    title: "Home",
    icon: "solar:home-2-linear",
  },
  {
    id: "2",
    link: "/search",
    title: "Search",
    icon: "solar:magnifer-linear",
  },
  {
    id: "3",
    link: "/category",
    title: "Category",
    icon: "solar:box-minimalistic-linear",
  },
  {
    id: "4",
    link: "/basket",
    title: "Cart",
    icon: "solar:cart-large-2-linear",
  },
  {
    id: "5",
    link: "/profile",
    title: "Profile",
    icon: "solar:user-linear",
  },
];

const BottomNavigation = () => {
  const [activeItem, setActiveItem] = useState("1");
  const curveRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleItemOnClick = (
    item: LinkItem,
    targetElement:
      | React.MouseEvent<HTMLDivElement, MouseEvent>["currentTarget"]
      | Element
      | null
  ) => {
    if (curveRef.current && bubbleRef.current && targetElement) {
      setActiveItem(item.id);
      const positionOfTarget = targetElement.getBoundingClientRect().left;
      const curveWidth = curveRef.current.clientWidth;
      const x = (window.innerWidth - curveWidth) / 2;

      const bgPosition = ((positionOfTarget - x + 60) / curveWidth) * 100;
      let revertedBgPosition = (bgPosition - 100) * -1;

      curveRef.current.style.backgroundPositionX =
        revertedBgPosition * 1.1 + "%";

      bubbleRef.current.style.left = bgPosition - 10 + "%";
    }
  };

  useEffect(() => {
    const targetItem = document.querySelector(`#navigation-item-${activeItem}`);

    handleItemOnClick(links[0], targetItem);
  }, []);
  return (
    <div className="w-full  max-w-[inherit] h-16 absolute bottom-0 bg">
      <div
        ref={curveRef}
        className={` absolute transition-all bottom-0 bg-[url('/asset/BottomNavigationBg.svg')] bg-cover bg-center w-full h-full  `}
      >
        <div className="relative w-full h-full ">
          <div
            ref={bubbleRef}
            className="absolute w-12 h-12 rounded-full -top-7 bg-purple-700  transition-all"
          ></div>
        </div>
      </div>
      <div className="absolute z-10 flex justify-between items-end h-full w-full ">
        {links.map((linkItem) => {
          const isActive = activeItem == linkItem.id;

          return (
            <div
              id={`navigation-item-${linkItem.id}`}
              onClick={(e) => handleItemOnClick(linkItem, e.currentTarget)}
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
