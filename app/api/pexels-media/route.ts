import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get("type") || "video").toLowerCase(); // video | image
  const id = searchParams.get("id");
  const query = searchParams.get("query");
  const per_page = Number(searchParams.get("per_page") || "1");

  // Use a server-only env var (do NOT expose as NEXT_PUBLIC).
  // For quick local debugging we also accept NEXT_PUBLIC_PEXELS_API_KEY as a last-resort fallback.
  const API_KEY = process.env.NEXT_PEXELS_KEY || process.env.PEXELS_API_KEY || process.env.NEXT_PUBLIC_PEXELS_API_KEY || "";

  if (!API_KEY) {
    return NextResponse.json({ error: "Missing Pexels API key on server" }, { status: 500 });
  }

  const headers = { Authorization: API_KEY };

  try {
    // Log request params for server-side debugging
    console.log('[PEXELS-API] request:', { type, id, query, per_page });
    let mediaUrl: string | null = null;

    if (id && type === "video") {
      // Fetch by specific video ID
      const res = await fetch(`https://api.pexels.com/videos/videos/${encodeURIComponent(id)}`, { headers });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json({ error: `Pexels video by id failed: ${res.status}`, body: text }, { status: res.status });
      }
      const data = await res.json();
      mediaUrl = data?.video_files?.[0]?.link || null;
    } else if (type === "video") {
      // Search videos by query or a default query
      const q = query || "bus ride";
      const res = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&per_page=${per_page}`, { headers });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json({ error: `Pexels video search failed: ${res.status}`, body: text }, { status: res.status });
      }
      const data = await res.json();
      mediaUrl = data?.videos?.[0]?.video_files?.[0]?.link || null;
    } else if (type === "image") {
      // Search images
      const q = query || "airplane";
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=${per_page}`, { headers });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json({ error: `Pexels image search failed: ${res.status}`, body: text }, { status: res.status });
      }
      const data = await res.json();
      mediaUrl = data?.photos?.[0]?.src?.large || null;
    } else {
      return NextResponse.json({ error: "Unsupported type. Use type=video or type=image" }, { status: 400 });
    }

    if (!mediaUrl) {
      return NextResponse.json({ error: "No media found" }, { status: 404 });
    }

    return NextResponse.json({ url: mediaUrl });
  } catch (err: any) {
    console.error('[PEXELS-API] unexpected error:', err);
    return NextResponse.json({ error: "Server error fetching Pexels", details: err?.message || String(err) }, { status: 500 });
  }
}
