// "use client";

// import { useEffect, useState } from "react";
// import FormField from "../FormField/page";
// import { inventoryGridCols } from "@/layoutConfig";
// import InventoryItem from "../inventoryItem/page";
// import { RootState } from "@/redux/store";
// import { useSelector, useDispatch } from "react-redux";
// import { addItem } from "@/redux/itemsSlice";

// export default function InventoryCard() {
//   const dispatch = useDispatch();
//   const items = useSelector((state: RootState) => state.items.list);
//   const [searchItem, setSearchitem] = useState("");

//   useEffect(() => {
//     async function fetchItems() {
//       const res = await fetch("/api/items");
//       const data = await res.json();

//       data.forEach((item: any) => {
//         dispatch(addItem(item));
//       });
//     }

//     if (items.length === 0) fetchItems();
//   }, [dispatch, items.length]);

//   const filteredItems = items.filter((item: any) =>
//     item.name.toLowerCase().includes(searchItem.toLowerCase())
//   );

//   return (
//     <div className="max-w-[1530px] w-full bg-cardBg h-full rounded-lg py-[80px] px-[80px] flex flex-col gap-5">
//       <span>
//         <FormField
//           label="Search your Item"
//           value={searchItem}
//           onChange={(value: string) => setSearchitem(value)}
//           placeholder="Type here"
//           fontSize="14px"
//         />
//       </span>
//       <span className="max-h-[400px] overflow-y-auto">
//         <span
//           className={`${inventoryGridCols} px-[120px] py-[20px] bg-fieldBg border-b rounded-t-sm border-gray-600 text-white text-sm`}
//         >
//           <p>Item name</p>
//           <p>Item type</p>
//           <p>Gauge / Gote</p>
//           <p>Size</p>
//           <p>Weight (KG)</p>
//           <p>Quantity Available</p>
//           <p>Price Per unit (PKR)</p>
//           <p>Actions</p>
//           <p>Date</p>
//         </span>

//         {filteredItems.map((item: any) => (
//           <InventoryItem key={item._id} {...item} />
//         ))}
//       </span>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import FormField from "../FormField/page";
import { inventoryGridCols } from "@/layoutConfig";
import InventoryItem from "../inventoryItem/page";

export default function InventoryCard() {
  const [items, setItems] = useState<any[]>([]);
  const [searchItem, setSearchitem] = useState("");
  const filteredItems = items.filter((item: any) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/items");
      const data = await res.json();

      setItems(data.items || []);
    };

    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

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
          <InventoryItem key={item._id} {...item} onDelete={handleDelete} />
        ))}
      </span>
    </div>
  );
}
