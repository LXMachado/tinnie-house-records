import { NextResponse } from "next/server"

// This is a test endpoint to help diagnose SoundCloud API issues
export async function GET() {
  if (!process.env.SOUNDCLOUD_CLIENT_ID) {
    return NextResponse.json({ error: "SOUNDCLOUD_CLIENT_ID environment variable is not set" }, { status: 500 })
  }

  try {
    // Test the client ID with a simple API call
    const testUrl = `https://api.soundcloud.com/tracks?client_id=${process.env.SOUNDCLOUD_CLIENT_ID}&limit=1`
    console.log("Testing SoundCloud API connection...")

    const response = await fetch(testUrl)
    const responseStatus = response.status
    const responseHeaders = Object.fromEntries(response.headers.entries())

    let responseBody = null
    try {
      responseBody = await response.json()
    } catch (e) {
      responseBody = { error: "Failed to parse response body" }
    }

    // Try a different endpoint to see if it's a specific endpoint issue
    const alternativeUrl = `https://api.soundcloud.com/users/tinniehouserecords?client_id=${process.env.SOUNDCLOUD_CLIENT_ID}`
    console.log("Testing alternative SoundCloud API endpoint...")

    const alternativeResponse = await fetch(alternativeUrl)
    const alternativeStatus = alternativeResponse.status

    let alternativeBody = null
    try {
      alternativeBody = await alternativeResponse.json()
    } catch (e) {
      alternativeBody = { error: "Failed to parse response body" }
    }

    return NextResponse.json({
      success: response.ok,
      status: responseStatus,
      headers: responseHeaders,
      body: responseBody,
      alternativeTest: {
        success: alternativeResponse.ok,
        status: alternativeStatus,
        body: alternativeBody,
      },
      clientIdLength: process.env.SOUNDCLOUD_CLIENT_ID?.length || 0,
      clientIdPrefix: process.env.SOUNDCLOUD_CLIENT_ID?.substring(0, 4) || "none",
    })
  } catch (error) {
    console.error("Error testing SoundCloud API:", error)
    return NextResponse.json(
      {
        error: "Failed to test SoundCloud API",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

