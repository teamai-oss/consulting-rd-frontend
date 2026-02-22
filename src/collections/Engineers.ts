import type { CollectionConfig } from 'payload'
import { revalidateCache } from '../hooks/revalidateCache'

export const Engineers: CollectionConfig = {
    slug: 'engineers',
    admin: {
        useAsTitle: 'reference',
        description: 'Base de données des ingénieurs qualifiés (Top 3%)',
    },
    hooks: {
        afterChange: [revalidateCache],
    },
    fields: [
        {
            name: 'reference',
            label: 'Référence Anonymisée (ex: ING-CVC-042)',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'expertise',
            label: 'Pôle d\'Expertise Principal',
            type: 'relationship',
            relationTo: 'expertises',
            required: true,
        },
        {
            name: 'seniorityYears',
            label: 'Années d\'expérience (Usage Interne)',
            type: 'number',
            required: true,
            min: 0,
            admin: {
                description: 'La valeur exacte ne sera pas exposée publiquement (transformée en tranche: 0-3, 3-7, 7+).',
            },
        },
        {
            type: 'group',
            name: 'assessment',
            label: 'Évaluation & Crash Test technique',
            fields: [
                {
                    name: 'technicalCrashTestScore',
                    label: 'Score au Crash Test Technique (/100)',
                    type: 'number',
                    required: true,
                    min: 0,
                    max: 100,
                },
                {
                    name: 'scoreVersion',
                    label: 'Version de la Grille de Test',
                    type: 'text',
                    defaultValue: 'v1.0.0',
                    required: true,
                },
                {
                    name: 'assessmentDate',
                    label: 'Date d\'évaluation',
                    type: 'date',
                }
            ]
        },
        {
            type: 'group',
            name: 'validationRH',
            label: 'Audit RH & Savoir-Être',
            fields: [
                {
                    name: 'drhValidationStatus',
                    label: 'Statut de Validation DRH',
                    type: 'select',
                    defaultValue: 'draft',
                    options: [
                        { label: 'Brouillon', value: 'draft' },
                        { label: 'Validé', value: 'validated' },
                        { label: 'Certifié Élite', value: 'certified' },
                        { label: 'Archivé / Rejeté', value: 'archived' },
                    ],
                    required: true,
                },
                {
                    name: 'validationDate',
                    label: 'Date de Validation',
                    type: 'date',
                },
                {
                    name: 'drhValidatorId',
                    label: 'ID Interne du Validateur',
                    type: 'text',
                    admin: { description: 'Ex: RH-01 (ne pas utiliser de nom réel)' }
                },
                {
                    name: 'validationNotes',
                    label: 'Notes d\'Audit (Interne strictement)',
                    type: 'textarea',
                    admin: {
                        description: 'Ces notes ne seront jamais exposées via l\'API publique.',
                    },
                    access: {
                        read: () => false, // Protégé par défaut au niveau du resolver GraphQL/REST public
                    }
                }
            ]
        },
        {
            name: 'availability',
            label: 'Disponibilité',
            type: 'select',
            defaultValue: 'available',
            options: [
                { label: 'Temps Plein (5j)', value: 'full_time' },
                { label: 'Temps Partiel (2-3j)', value: 'part_time' },
                { label: 'Bientôt Disponible', value: 'soon_available' },
                { label: 'Indisponible (En mission)', value: 'not_available' },
            ],
            required: true,
        },
        {
            name: 'softwares',
            label: 'Logiciels maîtrisés (Surpasse l\'expertise globale)',
            type: 'array',
            fields: [
                {
                    name: 'softwareName',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
