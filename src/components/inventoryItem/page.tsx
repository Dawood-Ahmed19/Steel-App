"use client";

import { inventoryGridCols } from "@/layoutConfig";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeItem } from "@/redux/itemsSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface InventoryItemsProps {
  id: string;
  name: string;
  type: string;
  guage: number;
  size: number;
  weight: number;
  quantity: number;
  price: number;
}

export default function InventoryItem({
  id,
  name,
  type,
  guage,
  size,
  weight,
  quantity,
  price,
}: InventoryItemsProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleRemoveItem = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (confirmDelete) {
      dispatch(removeItem(id));
    }
  };

  const handleEditItem = () => {
    router.push(`/Inventory/edit/${id}`);
  };

  return (
    <div
      className={`${inventoryGridCols} px-[120px] py-[20px] bg-fieldBg border-b border-gray-800 text-white`}
    >
      <p>{name}</p>
      <p>{type}</p>
      <p>{guage}</p>
      <p>{size}</p>
      <p>{weight}</p>
      <p>{quantity}</p>
      <p>{price}</p>
      <div className="flex gap-2">
        <button onClick={handleEditItem} className="hover:cursor-pointer">
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button onClick={handleRemoveItem} className="hover:cursor-pointer">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
