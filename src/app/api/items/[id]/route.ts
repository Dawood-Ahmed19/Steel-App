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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await new Promise((resolve, reject) => {
      db.findOne({ _id: params.id }, (err: any, doc: any) => {
        if (err) reject(err);
        else resolve(doc);
      });
    });

    if (!item) {
      return new Response(
        JSON.stringify({ success: false, error: "Item not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true, item }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
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
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const numAffected = await db.update({ _id: params.id }, { $set: body });

    if (numAffected === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Item not found" }),
        { status: 404 }
      );
    }

    const updatedDoc = await db.findOne({ _id: params.id });

    return new Response(JSON.stringify({ success: true, item: updatedDoc }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
}
