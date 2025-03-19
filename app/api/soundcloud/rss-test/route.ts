import { NextResponse } from "next/server"

// This is a test endpoint to check if we can access the SoundCloud RSS feed
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "tinniehouserecords"

  try {
    console.log(`Testing SoundCloud RSS feed for ${username}`)

    const rssUrl = `https://feeds.soundcloud.com/users/soundcloud:users:${username}/sounds.rss`
    console.log(`Fetching from: ${rssUrl}`)

    const response = await fetch(rssUrl)

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        message: `Failed to fetch RSS feed: ${response.statusText}`,
      })
    }

    const rssText = await response.text()

    // Extract a sample of the RSS content
    const sample = rssText.substring(0, 500) + "..."

    // Count the number of items
    const itemCount = (rssText.match(/<item>/g) || []).length

    return NextResponse.json({
      success: true,
      status: response.status,
      contentType: response.headers.get("content-type"),
      itemCount,
      sample,
    })
  } catch (error) {
    console.error("Error testing SoundCloud RSS feed:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to test SoundCloud RSS feed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

