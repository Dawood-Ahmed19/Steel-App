import { NextResponse } from "next/server";
import { quotationDb, inventoryDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { items, discount } = await req.json();

    const newQuotation = await quotationDb.insert({
      items,
      discount,
      date: new Date().toISOString(),
    });

    for (const soldItem of items) {
      const { item, qty } = soldItem;

      // Find inventory item by name
      const inventoryItem: any = await inventoryDb.findOne({ name: item });

      if (inventoryItem) {
        const newQty = (inventoryItem.quantity || 0) - Number(qty);

        if (newQty <= 0) {
          await inventoryDb.remove({ _id: inventoryItem._id }, {});
        } else {
          // Update quantity
          await inventoryDb.update(
            { _id: inventoryItem._id },
            { $set: { quantity: newQty } }
          );
        }
      }
    }

    return NextResponse.json({ success: true, quotation: newQuotation });
  } catch (err: any) {
    console.error("Error saving quotation:", err);
    return NextResponse.json(
      { error: "Failed to save quotation" },
      { status: 500 }
    );
  }
}
