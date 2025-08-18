"use client";

import { useState, useEffect } from "react";
import FormField from "../FormField/page";
import { useDispatch } from "react-redux";
import { addItem, editItem } from "@/redux/itemsSlice";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const GuageOptions = ["1.35", "1.1", "1.0", "0.9", "0.8", "0.7"];
const GuageAdditionalOptions = ["0.6", "0.5", "0.4", "0.35", "0.3"];

const SquareitemSizeOptions = [
  `4" x 4"`,
  `3" x 3"`,
  `2" x 2"`,
  `1 - 1/2" x 1 - 1/2"`,
  `1 - 1/4" x 1 - 1/4"`,
  `1" x 1"`,
];

const additionalSquareItemSizeOptions = [
  `3/4" x 3/4"`,
  `1/2" x 1/2"`,
  `1 - 1/2" x 3"`,
  `1" x 2"`,
  `1" x 1 - 1/2"`,
  `3/4" x 1 - 1/2"`,
  `1/2" x 1 - 1/2"`,
  `1/2" x 1"`,
  `3/4" x 3/8"`,
];

const RounditemSizeOptions = [
  `4"`,
  `3"`,
  `2 - 1/2"`,
  `2"`,
  `1 - 1/2"`,
  `1 - 1/4"`,
  `1"`,
];

const additionalRoundItemSizeOptions = [`3/4"`, `5/8"`, `1/2"`, `3/8"`];

interface ItemCardProps {
  initialData?: {
    id: string;
    name: string;
    type: string;
    pipeType: string;
    guage: number;
    size: string;
    weight: number;
    price: number;
    quantity: number;
  };
  isEdit?: boolean;
  onSubmit?: (updateData: {
    id: string;
    name: string;
    type: string;
    pipeType: string;
    guage: number;
    size: string;
    weight: number;
    price: number;
    quantity: number;
  }) => void;
}

export default function ItemCard({ initialData }: ItemCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [itemType, setItemType] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    itemType: "",
    itemName: "",
    pipeType: "",
    itemSize: "",
    weight: "",
    guage: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        itemType: initialData.type,
        pipeType: initialData.pipeType,
        itemName: initialData.name,
        itemSize: initialData.size,
        weight: String(initialData.weight),
        guage: String(initialData.guage),
        price: String(initialData.price),
        stock: String(initialData.quantity),
      });
      setItemType(initialData.type);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.itemName ||
      !formData.itemType ||
      !formData.pipeType ||
      !formData.guage ||
      !formData.itemSize ||
      !formData.stock ||
      !formData.price
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    setIsLoading(true);

    const newItem = {
      id: formData.id || uuidv4(),
      name: formData.itemName,
      type: formData.itemType,
      pipeType: formData.pipeType,
      guage: Number(formData.guage),
      size: formData.itemSize,
      weight: Number(formData.weight),
      price: Number(formData.price),
      quantity: Number(formData.stock),
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (initialData) {
      dispatch(editItem(newItem));
    } else {
      dispatch(addItem(newItem));
    }

    setIsLoading(false);
    router.push("/Inventory");
  };

  const computedGuageOptions =
    formData.pipeType === "Round" && formData.itemSize === `1"`
      ? [...GuageOptions, ...GuageAdditionalOptions]
      : GuageOptions;

  const fields = [
    {
      label: "Item Type",
      value: formData.itemType,
      type: "select",
      options: ["Pipe", "Hardware", "Pillars"],
      onChange: (value: string) =>
        setFormData((prev) => ({
          ...prev,
          itemType: value,
          pipeType: "",
          itemSize: "",
        })),
    },

    ...(formData.itemType === "Pipe" || formData.itemType === "Pillars"
      ? [
          {
            label: "Pipe Type",
            value: formData.pipeType,
            type: "select",
            options:
              formData.itemType === "Pipe"
                ? ["Round", "Square"]
                : ["Round", "Square", "Fancy"],
            onChange: (value: string) =>
              setFormData((prev) => ({
                ...prev,
                pipeType: value,
                itemSize: "",
              })),
          },
        ]
      : []),
    {
      label: "Item Name",
      value: formData.itemName,
      placeholder: "Item Name here",
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, itemName: value })),
    },
    {
      label: "Item Size",
      value: formData.itemSize,
      type: "select",
      options:
        formData.itemType === "Pipe"
          ? formData.pipeType === "Round"
            ? [...RounditemSizeOptions, ...additionalRoundItemSizeOptions]
            : formData.pipeType === "Square"
            ? [...SquareitemSizeOptions, ...additionalSquareItemSizeOptions]
            : []
          : RounditemSizeOptions,
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, itemSize: value })),
    },
    {
      label: "Guage",
      value: formData.guage,
      type: "select",
      options: computedGuageOptions,
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, guage: value })),
    },
    {
      label: "Price Per Kg (PKR)",
      value: formData.price,
      placeholder: "Put price here",
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, price: value })),
    },
    {
      label: "Total Stock",
      value: formData.stock,
      placeholder: "Total Stock value here",
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, stock: value })),
    },
    {
      label: "Weight (KG)",
      value: formData.weight,
      placeholder: "Type item Weight here",
      onChange: (value: string) =>
        setFormData((prev) => ({ ...prev, weight: value })),
    },
  ];

  return (
    <span className="bg-cardBg px-[75px] py-[55px] h-full max-w-[715px] w-full rounded-xl flex flex-col justify-between">
      <h1 className="font-bold text-base text-white">
        {initialData ? "Edit Item" : "Add Item"}
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {fields.map((field) => (
          <FormField key={field.label} {...field} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading
            ? initialData
              ? "Updating..."
              : "Adding..."
            : initialData
            ? "Update Item"
            : "Add Item"}
        </button>
      </div>
    </span>
  );
}
