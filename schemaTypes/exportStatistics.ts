import { defineType, defineField } from 'sanity'
import { BarChartIcon } from '@sanity/icons'

/**
 * Export Statistics Schema
 * Singleton document for managing export statistics displayed on the statistics page
 */
export default defineType({
  name: 'exportStatistics',
  title: 'Statistiques d\'export',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (interne)',
      type: 'string',
      initialValue: 'Statistiques d\'export',
      readOnly: true,
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Dernière mise à jour',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    // KPIs
    defineField({
      name: 'kpi',
      title: 'Indicateurs clés (KPI)',
      type: 'object',
      fields: [
        defineField({
          name: 'tonnesExported',
          title: 'Capacité d\'exportation (tonnes/an)',
          description: 'Capacité annuelle d\'exportation (toutes commodités confondues) : entre 20 000 et 40 000 tonnes',
          type: 'number',
          initialValue: 30000,
          validation: (Rule) => Rule.required().min(20000).max(40000),
        }),
        defineField({
          name: 'countriesServed',
          title: 'Nombre de pays desservis',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'countriesList',
          title: 'Liste des pays desservis',
          description: 'Noms des pays où vous exportez',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'producerPartners',
          title: 'Producteurs partenaires',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'yearsExperience',
          title: 'Années d\'expérience',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'tracedLots',
          title: 'Lots tracés (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        }),
      ],
    }),
    // Export by region
    defineField({
      name: 'exportsByRegion',
      title: 'Exports par région',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'region',
              title: 'Région',
              type: 'string',
              options: {
                list: [
                  { title: 'Europe', value: 'eu' },
                  { title: 'Asie', value: 'asia' },
                  { title: 'Amérique du Nord', value: 'usa' },
                  { title: 'Afrique', value: 'africa' },
                  { title: 'Autres', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'percentage',
              title: 'Pourcentage (%)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0).max(100),
            }),
            defineField({
              name: 'countries',
              title: 'Pays inclus',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: {
              region: 'region',
              percentage: 'percentage',
            },
            prepare({ region, percentage }) {
              const regionNames: Record<string, string> = {
                eu: 'Europe',
                asia: 'Asie',
                usa: 'Amérique du Nord',
                africa: 'Afrique',
                other: 'Autres',
              }
              return {
                title: regionNames[region] || region,
                subtitle: `${percentage}%`,
              }
            },
          },
        },
      ],
    }),
    // Top destinations
    defineField({
      name: 'topDestinations',
      title: 'Top destinations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'country',
              title: 'Pays',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'countryCode',
              title: 'Code pays (ISO)',
              type: 'string',
              description: 'Ex: FR, BE, NL, DE, CN',
              validation: (Rule) => Rule.required().length(2),
            }),
            defineField({
              name: 'percentage',
              title: 'Pourcentage (%)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0).max(100),
            }),
            defineField({
              name: 'port',
              title: 'Port principal',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              country: 'country',
              percentage: 'percentage',
              port: 'port',
            },
            prepare({ country, percentage, port }) {
              return {
                title: `${country} - ${percentage}%`,
                subtitle: port ? `Port: ${port}` : '',
              }
            },
          },
        },
      ],
    }),
    // Monthly volumes
    defineField({
      name: 'monthlyVolumes',
      title: 'Volumes mensuels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'month',
              title: 'Mois',
              type: 'string',
              options: {
                list: [
                  { title: 'Janvier', value: 'Jan' },
                  { title: 'Février', value: 'Fév' },
                  { title: 'Mars', value: 'Mar' },
                  { title: 'Avril', value: 'Avr' },
                  { title: 'Mai', value: 'Mai' },
                  { title: 'Juin', value: 'Juin' },
                  { title: 'Juillet', value: 'Juil' },
                  { title: 'Août', value: 'Août' },
                  { title: 'Septembre', value: 'Sep' },
                  { title: 'Octobre', value: 'Oct' },
                  { title: 'Novembre', value: 'Nov' },
                  { title: 'Décembre', value: 'Déc' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'year',
              title: 'Année',
              type: 'number',
              validation: (Rule) => Rule.required().min(2020).max(2030),
            }),
            defineField({
              name: 'volume',
              title: 'Volume (tonnes)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              month: 'month',
              year: 'year',
              volume: 'volume',
            },
            prepare({ month, year, volume }) {
              return {
                title: `${month} ${year}`,
                subtitle: `${volume} tonnes`,
              }
            },
          },
        },
      ],
    }),
    // Product mix
    defineField({
      name: 'productMix',
      title: 'Répartition par produit',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Produit',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'string',
              description: 'Identifiant unique (ex: cacao, cafe, cajou)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'volume',
              title: 'Volume (tonnes)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'percentage',
              title: 'Pourcentage (%)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0).max(100),
            }),
            defineField({
              name: 'color',
              title: 'Couleur (hex)',
              type: 'string',
              description: 'Ex: #8B4513 pour le cacao',
              validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/),
            }),
          ],
          preview: {
            select: {
              product: 'product',
              percentage: 'percentage',
              volume: 'volume',
            },
            prepare({ product, percentage, volume }) {
              return {
                title: `${product} - ${percentage}%`,
                subtitle: `${volume} tonnes`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      lastUpdated: 'lastUpdated',
    },
    prepare({ lastUpdated }) {
      return {
        title: 'Statistiques d\'export',
        subtitle: lastUpdated ? `Mis à jour: ${lastUpdated}` : 'Non configuré',
      }
    },
  },
})
