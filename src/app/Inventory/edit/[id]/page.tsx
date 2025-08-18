"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { editItem } from "@/redux/itemsSlice";
import ItemCard from "@/components/itemCard/page";

export default function EditItemPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const item = useSelector((state: RootState) =>
    state.items.list.find((i) => i.id === id)
  );

  if (!item) return <p>Item not found</p>;

  const handleUpdate = (updatedData: typeof item) => {
    dispatch(editItem(updatedData));
    router.push("/inventory");
  };

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col items-center w-full h-full justify-center py-[35px] px-[72px] gap-[65px]">
      <span className="flex justify-between w-full">
        <h1 className="text-xl font-bold text-white">Edit your Item</h1>
        <p className="text-sm text-white">{formattedDate}</p>
      </span>
      <ItemCard initialData={item} onSubmit={handleUpdate} isEdit={true} />
    </div>
  );
}
