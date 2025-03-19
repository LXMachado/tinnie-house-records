import { NextResponse } from "next/server"

// Define the Track interface for type safety
interface Track {
  id: string
  title: string
  user: { username: string }
  artwork_url: string | null
  permalink_url: string
}

// Main API handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "tinniehouserecords"
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  try {
    // Step 1: Try to get credentials from environment variable first
    let clientId = process.env.SOUNDCLOUD_CLIENT_ID
    let userId: string | null = null

    // If no client ID in env, try to extract from the profile page
    if (!clientId) {
      console.log(`No SOUNDCLOUD_CLIENT_ID found in environment, extracting from profile page...`)
      const credentials = await extractSoundCloudCredentials(username)
      clientId = credentials.clientId
      userId = credentials.userId
    } else {
      console.log(`Using SOUNDCLOUD_CLIENT_ID from environment variables`)
      // If we have client ID but need user ID
      userId = await getUserIdFromUsername(username, clientId)
    }

    if (!clientId) {
      throw new Error("Failed to obtain SoundCloud client_id")
    }

    if (!userId) {
      throw new Error(`Failed to obtain user_id for username: ${username}`)
    }

    console.log(`Successfully obtained credentials - userId: ${userId}`)

    // Step 2: Fetch tracks from SoundCloud's internal API
    const tracksUrl = `https://api-v2.soundcloud.com/users/${userId}/tracks?client_id=${clientId}&limit=${limit}&offset=${offset}`
    console.log(`Fetching tracks from: ${tracksUrl.replace(clientId, "CLIENT_ID_HIDDEN")}`)

    const tracksResponse = await fetch(tracksUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!tracksResponse.ok) {
      throw new Error(`Failed to fetch tracks: ${tracksResponse.status}`)
    }

    const tracksData = await tracksResponse.json()
    console.log(`Received ${tracksData.collection?.length || 0} tracks from SoundCloud API`)

    // Step 3: Normalize the data into the expected Track format
    if (!tracksData.collection || !Array.isArray(tracksData.collection)) {
      throw new Error("Invalid response format from SoundCloud API")
    }

    const tracks: Track[] = tracksData.collection.map((track: any) => ({
      id: track.id.toString(),
      title: track.title,
      user: { username: track.user?.username || username },
      artwork_url: track.artwork_url || null,
      permalink_url: track.permalink_url,
    }))

    if (tracks.length === 0) {
      throw new Error("No tracks found for this user")
    }

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error("SoundCloud API error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occurred",
        tracks: [],
      },
      { status: 500 },
    )
  }
}

// Function to extract credentials from SoundCloud profile page
async function extractSoundCloudCredentials(username: string) {
  const profileUrl = `https://soundcloud.com/${username}`
  console.log(`Fetching profile page: ${profileUrl}`)

  const response = await fetch(profileUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch SoundCloud profile: ${response.status}`)
  }

  const html = await response.text()
  console.log(`Received profile page HTML (${html.length} bytes)`)

  // Try multiple regex patterns for client_id
  let clientId: string | null = null
  const clientIdPatterns = [
    /client_id:"([^"]+)"/,
    /client_id=([^&]+)/,
    /https:\/\/api-v2\.soundcloud\.com\/[^?]+\?client_id=([^&]+)/,
  ]

  for (const pattern of clientIdPatterns) {
    const match = html.match(pattern)
    if (match && match[1]) {
      clientId = match[1]
      console.log(`Found client_id using pattern: ${pattern}`)
      break
    }
  }

  // Try multiple regex patterns for user_id
  let userId: string | null = null
  const userIdPatterns = [/soundcloud:\/\/users:(\d+)/, /"id":(\d+),"kind":"user"/, /"user_id":(\d+)/]

  for (const pattern of userIdPatterns) {
    const match = html.match(pattern)
    if (match && match[1]) {
      userId = match[1]
      console.log(`Found user_id using pattern: ${pattern}`)
      break
    }
  }

  // If we couldn't find the user ID but have client ID, try to get it from the API
  if (!userId && clientId) {
    userId = await getUserIdFromUsername(username, clientId)
  }

  if (!clientId) {
    // Sample a portion of the HTML for debugging
    const htmlSample = html.substring(0, 500) + "..."
    console.error(`Failed to extract client_id. HTML sample: ${htmlSample}`)
    throw new Error("Unable to extract client_id from profile page")
  }

  if (!userId) {
    throw new Error("Unable to extract user_id from profile page")
  }

  return { clientId, userId }
}

// Function to get user ID from username using the client ID
async function getUserIdFromUsername(username: string, clientId: string) {
  try {
    console.log(`Fetching user ID for username: ${username}`)
    const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/${username}&client_id=${clientId}`

    const response = await fetch(resolveUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to resolve username: ${response.status}`)
    }

    const userData = await response.json()
    if (userData && userData.id) {
      console.log(`Resolved user ID: ${userData.id}`)
      return userData.id.toString()
    }

    throw new Error("User ID not found in response")
  } catch (error) {
    console.error("Error resolving username to user ID:", error)
    return null
  }
}

// Optional: Add caching headers for better performance
export const dynamic = "force-dynamic" // Ensure Next.js doesn't statically optimize this route
export const revalidate = 3600 // Revalidate cache every hour (if using ISR)

