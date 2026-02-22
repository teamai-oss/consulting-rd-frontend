import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Appliquer les headers de base
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    // 🚨 SÉCURITÉ G8 : Dual CSP Strategy
    // Le panel admin de Payload a besoin de unsafe-inline pour fonctionner correctement
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    if (!isAdminRoute) {
        // CSP Strict pour les routes publiques de la vitrine B2B
        // Note: Pour une implémentation absolue, on utiliserait un 'nonce' généré aléatoirement
        const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: blob:;
      connect-src 'self' https://*.neon.tech;
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim()

        // Pour du test en staging, on pourrait utiliser Content-Security-Policy-Report-Only
        response.headers.set('Content-Security-Policy', cspHeader)
    }

    return response
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
