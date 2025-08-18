"use client";

import { useState } from "react";
import FormField from "../FormField/page";
import { inventoryGridCols } from "@/layoutConfig";
import InventoryItem from "../inventoryItem/page";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const GuageOptions = ["1.35", "1.1", "1.0", "0.9", "0.8", "0.7"];
const GuageAdditionalOptions = ["0.6", "0.5", "0.4", "0.35", "0.3"];

const SquareitemSizeOptions = [
  `4" x 4"`,
  `3" x 3"`,
  `2" x 2"`,
  `1 - 1/2" x 1 - 1/2"`,
  `1 - 1/4" x 1 - 1/4"`,
  `1" x 1"`,
  `3/4" x 3/4"`,
  `1/2" x 1/2"`,
  `1 - 1/2" x 3"`,
  `1" x 2"`,
  `1" x 1 - 1/2"`,
  `3/4" x 1 - 1/2"`,
  `1/2" x 1 - 1/2"`,
  `1/2" x 1"`,
  `3/4" x 3/8x`,
];

const RounditemSizeOptions = [
  `4"`,
  `3"`,
  `2 - 1/2"`,
  `2"`,
  `1 - 1/2"`,
  `1 - 1/4"`,
  `1"`,
  `3/4"`,
  `5/8"`,
  `1/2"`,
  `3/8"`,
];

export default function InventoryCard() {
  const items = useSelector((state: RootState) => state.items.list);
  const [searchItem, setSearchitem] = useState("");
  const filteredItems = items.filter((item: any) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );
  const [pipeType, setPipeType] = useState("Round");
  const [formData, setFormData] = useState({
    pipeType: "Round",
    itemSize: "",
    guage: "",
  });

  const computedGuageOptions =
    pipeType === "Round" && formData.itemSize === `1"`
      ? [...GuageOptions, ...GuageAdditionalOptions]
      : GuageOptions;

  const fields = [
    {
      label: "Pipe Type",
      type: "select",
      options: ["Round", "Square"],
      onChange: (value: string) => {
        setPipeType(value);
        setFormData((prev) => ({
          ...prev,
          pipeType: value,
          itemSize: "",
        }));
      },
    },
    {
      label: "Guage",
      type: "select",
      options: computedGuageOptions,
      onChange: (value: string) => {
        setFormData((prev) => ({
          ...prev,
          guage: value,
        }));
      },
    },
    {
      label: "Item Size",
      type: "select",
      options:
        pipeType === "Round" ? RounditemSizeOptions : SquareitemSizeOptions,
      onChange: (value: string) => {
        setFormData((prev) => ({
          ...prev,
          size: value,
        }));
      },
    },
  ];

  return (
    <div className="max-w-[1530px] w-full bg-cardBg h-full rounded-lg py-[80px] px-[80px] flex flex-col gap-5">
      <span>
        <FormField
          label="Search your Item"
          value={searchItem}
          onChange={(value: string) => setSearchitem(value)}
          placeholder="Type here"
          fontSize="14px"
        />
      </span>
      <span className="max-h-[400px] overflow-y-auto">
        <span
          className={`${inventoryGridCols} px-[120px] py-[20px] bg-fieldBg border-b rounded-t-sm border-gray-600 text-white text-sm`}
        >
          <p>Item name</p>
          <p>Item type</p>
          <p>Gauge / Gote</p>
          <p>Size</p>
          <p>Weight (KG)</p>
          <p>Quantity Available</p>
          <p>Price Per unit (PKR)</p>
          <p>Actions</p>
          <p>Date</p>
        </span>

        {filteredItems.map((item: any) => (
          <InventoryItem
            key={item.id}
            id={item.id}
            name={item.name}
            type={item.type}
            gote={item.gote}
            guage={item.guage}
            size={item.size}
            weight={item.weight}
            quantity={item.quantity}
            price={item.price}
            date={item.date}
          />
        ))}
      </span>
    </div>
  );
}
