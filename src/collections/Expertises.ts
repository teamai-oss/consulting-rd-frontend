import type { CollectionConfig } from 'payload'
import { revalidateCache } from '../hooks/revalidateCache'

export const Expertises: CollectionConfig = {
    slug: 'expertises',
    admin: {
        useAsTitle: 'title',
        description: 'Gestion des pôles d\'expertise (ex: CVC, VRD, Structure)',
    },
    hooks: {
        afterChange: [revalidateCache],
    },
    fields: [
        {
            name: 'title',
            label: 'Titre de l\'expertise',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'shortDescription',
            label: 'Description Courte',
            type: 'textarea',
            required: true,
        },
        {
            name: 'softwares',
            label: 'Logiciels Maîtrisés (Tags)',
            type: 'array',
            fields: [
                {
                    name: 'softwareName',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'published',
            options: [
                { label: 'Brouillon', value: 'draft' },
                { label: 'Publié', value: 'published' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
