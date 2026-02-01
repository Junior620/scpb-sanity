import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
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
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.fr', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Actualités entreprise', value: 'company-news' },
          { title: 'Marché & Tendances', value: 'market-trends' },
          { title: 'Filière cacao', value: 'cocoa-industry' },
          { title: 'Certifications & Qualité', value: 'certifications' },
          { title: 'Export & Logistique', value: 'export-logistics' },
          { title: 'Développement durable', value: 'sustainability' },
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      description: 'Résumé court pour les listes d\'articles',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text', validation: (Rule) => Rule.max(200) },
        { name: 'en', title: 'English', type: 'text', validation: (Rule) => Rule.max(200) },
        { name: 'ru', title: 'Русский', type: 'text', validation: (Rule) => Rule.max(200) },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'array', of: [
          { type: 'block' },
          { type: 'image', options: { hotspot: true } },
        ]},
        { name: 'en', title: 'English', type: 'array', of: [
          { type: 'block' },
          { type: 'image', options: { hotspot: true } },
        ]},
        { name: 'ru', title: 'Русский', type: 'array', of: [
          { type: 'block' },
          { type: 'image', options: { hotspot: true } },
        ]},
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'video',
      title: 'Vidéo (optionnel)',
      description: 'URL de la vidéo (YouTube, Vimeo, ou lien direct)',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL de la vidéo',
          type: 'url',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https'],
          }),
        },
        {
          name: 'platform',
          title: 'Plateforme',
          type: 'string',
          options: {
            list: [
              { title: 'YouTube', value: 'youtube' },
              { title: 'Vimeo', value: 'vimeo' },
              { title: 'Lien direct (MP4)', value: 'direct' },
            ],
          },
        },
        {
          name: 'thumbnail',
          title: 'Miniature personnalisée (optionnel)',
          type: 'image',
          description: 'Si non fournie, l\'image principale sera utilisée',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'object',
      fields: [
        {
          name: 'authorType',
          title: 'Type d\'auteur',
          type: 'string',
          options: {
            list: [
              { title: 'Membre de l\'équipe', value: 'team' },
              { title: 'Auteur externe', value: 'external' },
            ],
            layout: 'radio',
          },
          initialValue: 'team',
        },
        {
          name: 'teamMember',
          title: 'Membre de l\'équipe',
          type: 'reference',
          to: [{ type: 'teamMember' }],
          hidden: ({ parent }) => parent?.authorType !== 'team',
        },
        {
          name: 'externalName',
          title: 'Nom de l\'auteur externe',
          type: 'string',
          hidden: ({ parent }) => parent?.authorType !== 'external',
        },
        {
          name: 'externalLink',
          title: 'Lien vers l\'auteur externe (optionnel)',
          type: 'url',
          hidden: ({ parent }) => parent?.authorType !== 'external',
        },
      ],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Produits liés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'featured',
      title: 'Article mis en avant',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'object', fields: [
          { name: 'fr', title: 'Français', type: 'string' },
          { name: 'en', title: 'English', type: 'string' },
          { name: 'ru', title: 'Русский', type: 'string' },
        ]},
        { name: 'metaDescription', title: 'Meta Description', type: 'object', fields: [
          { name: 'fr', title: 'Français', type: 'text' },
          { name: 'en', title: 'English', type: 'text' },
          { name: 'ru', title: 'Русский', type: 'text' },
        ]},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Date de publication (récent)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
