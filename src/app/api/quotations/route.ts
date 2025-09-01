import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, discount } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const quotation = {
      items,
      discount: Number(discount) || 0,
      total: items.reduce(
        (acc: number, row: any) => acc + (row.amount || 0),
        0
      ),
      date: new Date().toISOString(),
    };

    const savedQuotation = await db.insert(quotation);

    for (const row of items) {
      if (!row.item || !row.qty) continue;

      await db.update(
        { name: row.item },
        { $inc: { quantity: -Number(row.qty) } },
        { multi: false }
      );
    }

    return NextResponse.json(savedQuotation, { status: 201 });
  } catch (err) {
    console.error("Error saving quotation:", err);
    return NextResponse.json(
      { error: "Failed to save quotation" },
      { status: 500 }
    );
  }
}
