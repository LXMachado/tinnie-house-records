import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "tinniehouserecords"

  try {
    console.log(`Fetching widget HTML for ${username}`)

    const widgetUrl = `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${username}`
    const response = await fetch(widgetUrl)

    if (!response.ok) {
      throw new Error(`Widget API error: ${response.statusText}`)
    }

    const html = await response.text()

    // Extract a sample of the HTML
    const sample = html.substring(0, 1000) + "..."

    // Look for key patterns
    const hasTracksArray = html.includes('"tracks":')
    const hasVisualPlaylist = html.includes('"visual_playlist":')
    const hasSoundData = html.includes("window.SC.Widget.Settings")

    // Try to extract a small sample of track data
    let trackSample = null
    const trackMatch = /"title":"([^"]+)".*?"permalink_url":"([^"]+)"/.exec(html)
    if (trackMatch) {
      trackSample = {
        title: trackMatch[1],
        permalink_url: trackMatch[2],
      }
    }

    return NextResponse.json({
      success: true,
      htmlLength: html.length,
      sample,
      patterns: {
        hasTracksArray,
        hasVisualPlaylist,
        hasSoundData,
      },
      trackSample,
    })
  } catch (error) {
    console.error("Error fetching widget HTML:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch widget HTML",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

