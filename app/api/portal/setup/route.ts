import { NextRequest, NextResponse } from 'next/server';
import { getUserByToken, setStudentPassword } from '@/lib/portalAuth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, error: 'Token is missing' }, { status: 400 });
    }

    const user = getUserByToken(token);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid or expired setup token' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        name: user.name
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json({ success: false, error: 'Token and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const result = setStudentPassword(token, password);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      user: result.user
    });

    response.cookies.set('portal_session', result.sessionToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    response.cookies.set('portal_user_email', result.user!.email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
