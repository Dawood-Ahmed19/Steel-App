"use client";

import QuotationField from "@/components/quotationField/page";

export default function Quotations() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-col items-center w-full h-full justify-center py-[35px] px-[72px] gap-[30px]">
      <span className="flex justify-between w-full">
        <h1 className="text-xl font-bold text-white">Make your Quotation</h1>
        <p className="text-sm text-white">{formattedDate}</p>
      </span>

      <span>
        <QuotationField />
      </span>
    </div>
  );
}
