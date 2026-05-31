import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const { clerkClient } = await import('@clerk/nextjs/server');
    const client = await clerkClient();

    const user = await client.users.getUser(userId);
    const metadata = user.publicMetadata as { trialStartDate?: string };

    if (!metadata?.trialStartDate) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          ...user.publicMetadata,
          trialStartDate: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Trial start error:', error);
    return NextResponse.json({ error: 'Failed to start trial' }, { status: 500 });
  }
}
