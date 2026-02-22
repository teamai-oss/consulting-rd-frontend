import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.consulting-rd.com'
    const payload = await getPayload({ config: configPromise })

    // 1. Route statique (Accueil)
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]

    try {
        // 2. Récupérer toutes les pages publiées dynamiquement depuis Payload CMS
        const pagesList = await payload.find({
            collection: 'pages',
            where: {
                status: { equals: 'published' },
            },
            depth: 0,
            limit: 1000,
        })

        // 3. Ajouter les pages au sitemap (sauf la home gérée manuellement)
        const dynamicRoutes = pagesList.docs
            .filter((page) => page.slug !== 'home')
            .map((page) => ({
                url: `${baseUrl}/${page.slug}`,
                lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            }))

        return [...routes, ...dynamicRoutes]
    } catch (error) {
        payload.logger.error(`Error generating sitemap: ${error}`)
        return routes
    }
}
