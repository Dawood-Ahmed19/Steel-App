// "use client";

// export default function ItemCard() {
//   return (
//     <span className="bg-cardBg px-[75px] py-[55px] h-full max-w-[715px] w-full rounded-xl flex flex-col justify-between">
//       <h1 className="font-bold text-base text-white">Add Item</h1>

//       {/* start */}
//       <div className="grid grid-cols-2 gap-6">
//         {/* Pipe Type */}
//         <div>
//           <label className="text-gray-400 text-sm block mb-1">Pipe Type</label>
//           <select className="w-full bg-[#181B28] text-white p-3 rounded focus:outline-none">
//             <option>Round</option>
//             <option>Square</option>
//           </select>
//         </div>

//         {/* Item Name */}
//         <div>
//           <label className="text-gray-400 text-sm block mb-1">Item Name</label>
//           <input
//             type="text"
//             placeholder="Iron Pipe"
//             className="w-full bg-[#181B28] text-white p-3 rounded focus:outline-none"
//           />
//         </div>

//         {/* Item Size */}
//         <div>
//           <label className="text-gray-400 text-sm block mb-1">Item size</label>
//           <select className="w-full bg-[#181B28] text-white p-3 rounded focus:outline-none">
//             <option>4 “</option>
//             <option>6 “</option>
//           </select>
//         </div>

//         {/* Guage */}
//         <div>
//           <label className="text-gray-400 text-sm block mb-1">Guage</label>
//           <input
//             type="text"
//             placeholder="1.35"
//             className="w-full bg-[#181B28] text-white p-3 rounded focus:outline-none"
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="text-gray-400 text-sm block mb-1">
//             Price Per Kg (PKR)
//           </label>
//           <input
//             type="text"
//             placeholder="200"
//             className="w-full bg-[#181B28] text-white p-3 rounded focus:outline-none"
//           />
//         </div>

//         {/* Total Stock */}
//         <div>
//           <label className="text-gray-400 text-sm block mb-1">
//             Total Stock
//           </label>
//           <input
//             type="text"
//             placeholder="100"
//             className="w-full bg-[#181B28] text-white p-3 rounded focus:outline-none"
//           />
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-center mt-8">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
//           Add item
//         </button>
//       </div>

//       {/* end */}
//     </span>
//   );
// }

"use client";

import { useState } from "react";
import FormField from "../FormField/page";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/itemsSlice";
import { v4 as uuidv4 } from "uuid";

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

export default function ItemCard() {
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      id: uuidv4(),
      name: formData.itemName,
      type: formData.pipeType,
      guage: Number(formData.guage),
      size: formData.itemSize,
      price: Number(formData.price),
      quantity: Number(formData.stock),
    };

    dispatch(addItem(newItem));
  };
  const [pipeType, setPipeType] = useState("Round");
  const [formData, setFormData] = useState({
    pipeType: "",
    itemName: "",
    itemSize: "",
    guage: "",
    price: "",
    stock: "",
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
      label: "Item Name",
      placeholder: "Item Name here",
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, itemName: value })),
    },
    {
      label: "Item Size",
      type: "select",
      options:
        pipeType === "Round" ? RounditemSizeOptions : SquareitemSizeOptions,
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, itemSize: value })),
    },
    {
      label: "Guage",
      type: "select",
      options: computedGuageOptions,
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, guage: value })),
    },
    {
      label: "Price Per Kg (PKR)",
      placeholder: "200",
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, price: value })),
    },
    {
      label: "Total Stock",
      placeholder: "Total Stock value here",
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, stock: value })),
    },
    {
      label: "Weight",
      placeholder: "Type item Weight here",
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, stock: value })),
    },
  ];

  return (
    <span className="bg-cardBg px-[75px] py-[55px] h-full max-w-[715px] w-full rounded-xl flex flex-col justify-between">
      <h1 className="font-bold text-base text-white">Add Item</h1>

      <div className="grid grid-cols-2 gap-6">
        {fields.map((field) => (
          <FormField key={field.label} {...field} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add item
        </button>
      </div>
    </span>
  );
}
