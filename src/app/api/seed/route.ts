import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request) {
    // 🚨 SÉCURITÉ G8 : Désactivation totale en Production
    if (process.env.NODE_ENV === 'production' && process.env.ENABLE_SEED !== 'true') {
        return NextResponse.json(
            { error: 'Forbidden: Seeding is disabled in production environment.' },
            { status: 403 }
        )
    }

    // Check shared secret to protect this route from abuse
    const url = new URL(req.url)
    const secret = url.searchParams.get('secret')

    // En production, utiliser un vrai secret via les variables d'environnement
    const seedSecret = process.env.PAYLOAD_SECRET || 'dev-secret'
    if (secret !== seedSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config: configPromise })

    try {
        // 1. Créer les Expertises
        const cvc = await payload.create({
            collection: 'expertises',
            data: {
                title: 'Génie Climatique (CVC)',
                shortDescription: 'Chauffage, Ventilation, Climatisation : conception fluide et modélisation thermique 3D.',
                softwares: [{ softwareName: 'Revit MEP' }, { softwareName: 'Plancal Nova' }, { softwareName: 'AutoCAD' }],
                status: 'published',
            },
        })

        const struct = await payload.create({
            collection: 'expertises',
            data: {
                title: 'Structure & Charpente',
                shortDescription: 'Calcul et dimensionnement de structures Béton Armé, Métal et Bois.',
                softwares: [{ softwareName: 'Robot Structural Analysis' }, { softwareName: 'SCIA Engineer' }, { softwareName: 'Tekla' }],
                status: 'published',
            },
        })

        // 2. Créer les Ingénieurs
        await payload.create({
            collection: 'engineers',
            data: {
                reference: 'ING-CVC-042',
                expertise: cvc.id,
                seniorityYears: 8,
                assessment: {
                    technicalCrashTestScore: 92,
                    scoreVersion: 'v2.0.0',
                    assessmentDate: new Date().toISOString(),
                },
                validationRH: {
                    drhValidationStatus: 'certified',
                    drhValidatorId: 'DRH-01',
                    validationDate: new Date().toISOString(),
                    validationNotes: 'Excellent profil technique, très autonome sur Revit MEP.',
                },
                availability: 'soon_available',
                softwares: [{ softwareName: 'Revit MEP' }, { softwareName: 'Navisworks' }],
            },
        })

        await payload.create({
            collection: 'engineers',
            data: {
                reference: 'ING-STR-017',
                expertise: struct.id,
                seniorityYears: 4,
                assessment: {
                    technicalCrashTestScore: 88,
                    scoreVersion: 'v2.0.0',
                    assessmentDate: new Date().toISOString(),
                },
                validationRH: {
                    drhValidationStatus: 'validated',
                    drhValidatorId: 'RH-03',
                    validationDate: new Date().toISOString(),
                },
                availability: 'full_time',
                softwares: [{ softwareName: 'Robot Structural Analysis' }],
            },
        })

        return NextResponse.json({ success: true, message: 'Database seeded successfully.' })
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
