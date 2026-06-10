import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqEntry',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Export & documents', value: 'export' },
          { title: 'Conformité EUDR', value: 'eudr' },
          { title: 'Traçabilité', value: 'traceability' },
          { title: 'Commercial', value: 'commercial' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Identifiant',
      type: 'slug',
      options: { source: 'question.fr', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'ru', title: 'Русский', type: 'string' },
      ],
    }),
    defineField({
      name: 'answer',
      title: 'Réponse',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'English', type: 'text', validation: (Rule) => Rule.required() },
        { name: 'ru', title: 'Русский', type: 'text' },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordre dans la section',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Section puis ordre',
      name: 'sectionOrder',
      by: [
        { field: 'section', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'question.fr', subtitle: 'section' },
  },
})
