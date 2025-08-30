"use client";

import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TotalItem = () => {
  return (
    <div className="max-w-[250px] max-h-[170px] bg-cardBg px-[50px] py-[31px] flex flex-col items-center gap-4 rounded-lg">
      <span className="flex items-center gap-2">
        <span className="bg-IconBg flex items-center justify-center py-2 px-2 rounded-xl">
          <FontAwesomeIcon className="text-iconColor text-xl" icon={faTags} />
        </span>
        <span className="text-white text-xs">
          Total Items <br />
          <span className="font-bold">in Stock</span>
        </span>
      </span>
      <span className="font-bold text-white">100</span>
    </div>
  );
};

export default TotalItem;
