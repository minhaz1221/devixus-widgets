import { NextRequest, NextResponse } from 'next/server'

// TODO: Replace with real Meta Graph API when approved
const mockProfile = {
  username: 'johndoe',
  full_name: 'John Doe',
  profile_picture: 'https://i.pravatar.cc/150?img=12',
  followers: 12400,
  following: 891,
  bio: '📸 Photographer | ✈️ Traveler',
  posts: [
    {
      id: 'post_1',
      type: 'image',
      thumbnail: 'https://picsum.photos/seed/insta1/400/400',
      caption: 'Beautiful morning in the city ☀️ #photography #urban',
      likes: 234,
      comments: 18,
      timestamp: '2024-01-15T08:30:00Z',
    },
    {
      id: 'post_2',
      type: 'video',
      thumbnail: 'https://picsum.photos/seed/insta2/400/400',
      caption: 'Sunset timelapse 🌅 #video #nature',
      likes: 891,
      comments: 45,
      timestamp: '2024-01-14T18:00:00Z',
    },
    {
      id: 'post_3',
      type: 'image',
      thumbnail: 'https://picsum.photos/seed/insta3/400/400',
      caption: 'Coffee and code ☕ #developer',
      likes: 156,
      comments: 12,
      timestamp: '2024-01-13T10:15:00Z',
    },
    {
      id: 'post_4',
      type: 'image',
      thumbnail: 'https://picsum.photos/seed/insta4/400/400',
      caption: 'Weekend vibes 🎉 #weekend',
      likes: 445,
      comments: 33,
      timestamp: '2024-01-12T14:30:00Z',
    },
    {
      id: 'post_5',
      type: 'video',
      thumbnail: 'https://picsum.photos/seed/insta5/400/400',
      caption: 'Travel diary ep.3 ✈️ #travel',
      likes: 1203,
      comments: 87,
      timestamp: '2024-01-11T09:00:00Z',
    },
    {
      id: 'post_6',
      type: 'image',
      thumbnail: 'https://picsum.photos/seed/insta6/400/400',
      caption: 'Street food tour 🍜 #food #culture',
      likes: 678,
      comments: 54,
      timestamp: '2024-01-10T12:00:00Z',
    },
    {
      id: 'post_7',
      type: 'image',
      thumbnail: 'https://picsum.photos/seed/insta7/400/400',
      caption: 'Golden hour magic 🌄',
      likes: 321,
      comments: 29,
      timestamp: '2024-01-09T17:30:00Z',
    },
    {
      id: 'post_8',
      type: 'image',
      thumbnail: 'https://picsum.photos/seed/insta8/400/400',
      caption: 'Morning run 🏃 #fitness',
      likes: 189,
      comments: 15,
      timestamp: '2024-01-08T07:00:00Z',
    },
    {
      id: 'post_9',
      type: 'video',
      thumbnail: 'https://picsum.photos/seed/insta9/400/400',
      caption: 'Behind the scenes 🎬 #bts',
      likes: 567,
      comments: 41,
      timestamp: '2024-01-07T11:00:00Z',
    },
  ],
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'x-data-source': 'mock',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'johndoe'

  return NextResponse.json(
    { ...mockProfile, username },
    { headers: corsHeaders }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  })
}
