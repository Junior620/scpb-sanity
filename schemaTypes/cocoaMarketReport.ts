import { defineField, defineType } from 'sanity'

const THEME_OPTIONS = [
  { title: 'Cours internationaux', value: 'cours-internationaux' },
  { title: 'Cameroun', value: 'cameroun' },
  { title: "Côte d'Ivoire", value: 'cote-divoire' },
  { title: 'Stocks', value: 'stocks' },
  { title: 'Broyage', value: 'broyage' },
  { title: 'Météo', value: 'meteo' },
  { title: 'EUDR/ESG', value: 'eudr-esg' },
  { title: 'Logistique', value: 'logistique' },
  { title: 'Acteurs et concurrents', value: 'acteurs' },
]

export default defineType({
  name: 'cocoaMarketReport',
  title: 'Rapport veille cacao',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'ru', title: 'Русский', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.fr', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait SEO',
      description: '150–170 caractères recommandés',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text', rows: 3, validation: (Rule) => Rule.max(200) },
        { name: 'en', title: 'English', type: 'text', rows: 3, validation: (Rule) => Rule.max(200) },
        { name: 'ru', title: 'Русский', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'reportDate',
      title: 'Date du rapport',
      description: 'Identifiant éditorial principal (Africa/Douala). Un seul rapport par date.',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'marketDataDate',
      title: 'Date des données de marché',
      type: 'date',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de première publication',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Dernière modification',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Brouillon', value: 'draft' },
          { title: 'Publié', value: 'published' },
        ],
      },
      initialValue: 'published',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      initialValue: 'veille-cacao',
      readOnly: true,
    }),
    defineField({
      name: 'tags',
      title: 'Étiquettes',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'themes',
      title: 'Thèmes',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: THEME_OPTIONS },
    }),
    defineField({
      name: 'overallTrend',
      title: 'Tendance globale',
      type: 'string',
      options: {
        list: [
          { title: 'Hausse', value: 'up' },
          { title: 'Baisse', value: 'down' },
          { title: 'Stable', value: 'stable' },
          { title: 'Neutre', value: 'neutral' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      initialValue: 'Cellule de veille SCPB',
    }),
    defineField({
      name: 'readingTime',
      title: 'Temps de lecture (min)',
      type: 'number',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'executiveSummary',
      title: 'Synthèse exécutive',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
    }),
    defineField({
      name: 'keyFigures',
      title: 'Chiffres clés',
      type: 'array',
      of: [{ type: 'cocoaKeyFigure' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Faits marquants & analyses',
      type: 'array',
      of: [{ type: 'cocoaContentSection' }],
    }),
    defineField({
      name: 'impactsForSCPB',
      title: 'Impacts possibles pour la SCPB',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
    }),
    defineField({
      name: 'risks',
      title: 'Risques',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'opportunities',
      title: 'Opportunités',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'watchPoints',
      title: 'Points à surveiller',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{ type: 'cocoaSource' }],
    }),
    defineField({
      name: 'unconfirmedInformation',
      title: 'Informations non confirmées',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
    }),
  ],
  orderings: [
    {
      title: 'Date du rapport (récent)',
      name: 'reportDateDesc',
      by: [{ field: 'reportDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.fr',
      reportDate: 'reportDate',
      status: 'status',
    },
    prepare({ title, reportDate, status }) {
      return {
        title: title || 'Sans titre',
        subtitle: `${reportDate || '—'} · ${status || 'draft'}`,
      }
    },
  },
})
