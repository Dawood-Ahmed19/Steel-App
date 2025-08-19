// "use client";

// import { inventoryGridCols } from "@/layoutConfig";
// import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { removeItem } from "@/redux/itemsSlice";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";

// interface InventoryItemsProps {
//   id: string;
//   name: string;
//   type: string;
//   gote: number | string;
//   guage: number | string;
//   size: number;
//   weight: number;
//   quantity: number;
//   price: number;
//   date: string;
// }

// export default function InventoryItem({
//   id,
//   name,
//   type,
//   gote,
//   guage,
//   size,
//   weight,
//   quantity,
//   price,
//   date,
// }: InventoryItemsProps) {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const handleDelete = async () => {
//     try {
//       const res = await fetch("/api/items", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       if (res.ok) {
//         dispatch(removeItem(id));
//       } else {
//         console.error("Failed to delete item");
//       }
//     } catch (err) {
//       console.error("Error deleting item", err);
//     }
//   };

//   const handleEditItem = () => {
//     router.push(`/Inventory/edit/${id}`);
//   };

//   return (
//     <div
//       className={`${inventoryGridCols} px-[120px] py-[20px] bg-fieldBg border-b border-gray-800 text-white`}
//     >
//       <p>{name}</p>
//       <p>{type}</p>
//       <p>{gote ? `Gote: ${gote}` : `Gauge: ${guage}`}</p>
//       <p>{size}</p>
//       <p>{weight}</p>
//       <p>{quantity}</p>
//       <p>{price}</p>
//       <div className="flex gap-2">
//         <button onClick={handleEditItem} className="hover:cursor-pointer">
//           <FontAwesomeIcon icon={faPen} />
//         </button>
//         <button onClick={handleDelete} className="hover:cursor-pointer">
//           <FontAwesomeIcon icon={faTrash} />
//         </button>
//       </div>
//       <p>{new Date(date).toLocaleDateString()}</p>
//     </div>
//   );
// }

"use client";

import { inventoryGridCols } from "@/layoutConfig";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface InventoryItemsProps {
  _id: string;
  name: string;
  type: string;
  gote: number | string;
  guage: number | string;
  size: number;
  weight: number;
  quantity: number;
  price: number;
  date: string;
  onDelete: (id: string) => void;
}

export default function InventoryItem({
  _id,
  name,
  type,
  gote,
  guage,
  size,
  weight,
  quantity,
  price,
  date,
  onDelete,
}: InventoryItemsProps) {
  const router = useRouter();

  const handleEditItem = () => {
    router.push(`/Inventory/edit/${_id}`);
  };

  return (
    <div
      className={`${inventoryGridCols} px-[120px] py-[20px] bg-fieldBg border-b border-gray-800 text-white`}
    >
      <p>{name}</p>
      <p>{type}</p>
      <p>{gote ? `Gote: ${gote}` : `Gauge: ${guage}`}</p>
      <p>{size}</p>
      <p>{weight}</p>
      <p>{quantity}</p>
      <p>{price}</p>
      <div className="flex gap-2">
        <button onClick={handleEditItem} className="hover:cursor-pointer">
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button onClick={() => onDelete(_id)} className="hover:cursor-pointer">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <p>{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}
