// import { NextResponse } from "next/server";
// import db from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const newDoc = await db.insert(body);
//     return NextResponse.json(newDoc, { status: 201 });
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : String(error);
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const docs = await db.find({});
//     return NextResponse.json(docs, { status: 200 });
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : String(error);
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const { id } = await req.json();

//     await new Promise((resolve, reject) => {
//       db.remove({ _id: id }, {}, (err, numRemoved) => {
//         if (err) reject(err);
//         else resolve(numRemoved);
//       });
//     });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : String(error);
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// app / api / items / route.ts;

import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const item = await db.insert(body);

    return new Response(JSON.stringify({ success: true, item }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to save" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  try {
    const items = await db.find({});
    return new Response(JSON.stringify({ success: true, items }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const numRemoved = await db.remove({ _id: id }, {});

    return new Response(
      JSON.stringify({ success: true, removed: numRemoved }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to delete" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
