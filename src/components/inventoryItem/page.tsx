"use client";

import { inventoryGridCols } from "@/layoutConfig";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeItem } from "@/redux/itemsSlice";
import { useDispatch } from "react-redux";

interface InventoryItemsProps {
  id: string;
  name: string;
  type: string;
  guage: number;
  size: number;
  quantity: number;
  price: number;
}

export default function InventoryItem({
  id,
  name,
  type,
  guage,
  size,
  quantity,
  price,
}: InventoryItemsProps) {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (confirmDelete) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div
      className={`${inventoryGridCols} px-[120px] py-[20px] bg-fieldBg border-b border-gray-800 text-white`}
    >
      <p>{name}</p>
      <p>{type}</p>
      <p>{guage}</p>
      <p>{size}</p>
      <p>{quantity}</p>
      <p>{price}</p>
      <div className="flex gap-2">
        <button>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button onClick={handleRemoveItem} className="hover:cursor-pointer">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
