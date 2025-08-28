import db from "@/lib/db";
import { NextResponse } from "next/server";

interface InventoryItem {
  _id: string;
  name: string;
  quantity: number;
  rate?: number;
}

export async function POST(req: Request) {
  const rows = await req.json();

  for (const row of rows) {
    const existingItem = (await db.findOne({
      name: row.item,
    })) as InventoryItem | null;

    if (existingItem) {
      const newQty = Math.max((existingItem.quantity ?? 0) - row.qty, 0);
      await db.update(
        { _id: existingItem._id },
        { $set: { quantity: newQty } }
      );
    }
  }

  return NextResponse.json({ success: true });
}
