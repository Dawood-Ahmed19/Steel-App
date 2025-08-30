"use client";

import TotalItem from "@/components/totalitem/page";
import TotalQuotations from "@/components/totalQuot/page";

export default function DashboardScreen() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="px-[75px] py-[35px] h-full flex flex-col items-center gap-[50px]">
      <span className="flex justify-between w-full">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white">{formattedDate}</p>
      </span>
      <span className="w-full flex items-center justify-start gap-6">
        <TotalItem />
        <TotalQuotations />
      </span>
      <span className="max-h-[600px] h-full w-full overflow-y-auto bg-cardBg rounded-lg"></span>
    </div>
  );
}
