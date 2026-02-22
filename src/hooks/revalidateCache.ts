import { CollectionAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

// Hook Payload : Purge le cache Next.js (Data Cache) chirurgicalement
export const revalidateCache: CollectionAfterChangeHook = ({ doc, previousDoc, req: { payload }, collection }) => {
    // Ne revalider que si le document est publié ou si son statut de publication change
    const isPublished = doc._status === 'published' || !doc._status;
    const wasPublished = previousDoc?._status === 'published';
    const statusChanged = doc._status !== previousDoc?._status;

    if (isPublished || (statusChanged && wasPublished)) {
        const slug = collection.slug; // ex: 'pages', 'expertises', 'engineers'

        try {
            // Invalide de façon ciblée l'élément modifié
            payload.logger.info(`Revalidating granular cache for: ${slug}-${doc.id}`);
            revalidateTag(`${slug}-${doc.id}`);

            // Invalider la liste globale uniquement si on est sur une vue dépendante d'une liste
            revalidateTag(`${slug}-list`);

            // Cas particulier pour les pages d'acquisition
            if (slug === 'pages' && doc.slug) {
                revalidateTag(`pages-${doc.slug}`);
            }
        } catch (err: unknown) {
            payload.logger.error(`Error revalidating cache: ${err}`);
        }
    }

    return doc;
}
