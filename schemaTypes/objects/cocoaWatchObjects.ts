import { defineField, defineType } from 'sanity'

export const cocoaKeyFigure = defineType({
  name: 'cocoaKeyFigure',
  title: 'Chiffre clé',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Libellé', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'value', title: 'Valeur', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'unit', title: 'Unité', type: 'string' }),
    defineField({ name: 'currency', title: 'Devise', type: 'string' }),
    defineField({ name: 'referenceDate', title: 'Date de référence', type: 'string' }),
    defineField({
      name: 'trend',
      title: 'Tendance',
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
    defineField({ name: 'variation', title: 'Variation', type: 'string' }),
    defineField({ name: 'previousValue', title: 'Valeur précédente', type: 'string' }),
    defineField({ name: 'sourceUrl', title: 'URL source', type: 'url' }),
    defineField({
      name: 'featured',
      title: 'Mis en avant (carte)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
})

export const cocoaContentSection = defineType({
  name: 'cocoaContentSection',
  title: 'Section de contenu',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Ancre', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'content', title: 'Contenu', type: 'text', rows: 8, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'contentType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fait', value: 'fact' },
          { title: 'Analyse', value: 'analysis' },
          { title: 'Non confirmé', value: 'unconfirmed' },
          { title: 'Mixte', value: 'mixed' },
        ],
      },
      initialValue: 'mixed',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'contentType' },
  },
})

export const cocoaSource = defineType({
  name: 'cocoaSource',
  title: 'Source',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
    defineField({ name: 'publicationDate', title: 'Date de publication', type: 'string' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'url' },
  },
})
