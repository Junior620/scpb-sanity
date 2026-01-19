import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Membre équipe',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'object',
      description: 'Nom du membre de l\'équipe dans différentes langues',
      fields: [
        { name: 'fr', title: 'Français', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'ru', title: 'Русский (Russe)', type: 'string', description: 'Nom translittéré en cyrillique' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Poste',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'ru', title: 'Русский', type: 'string' },
      ],
    }),
    defineField({
      name: 'department',
      title: 'Département',
      type: 'string',
      options: {
        list: [
          { title: 'Direction', value: 'management' },
          { title: 'Commercial / Export', value: 'commercial' },
          { title: 'Qualité', value: 'quality' },
          { title: 'Logistique', value: 'logistics' },
          { title: 'Approvisionnement', value: 'sourcing' },
          { title: 'Administration', value: 'admin' },
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ru', title: 'Русский', type: 'text' },
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'isKeyContact',
      title: 'Contact clé export',
      description: 'Afficher comme interlocuteur principal pour les clients B2B',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      nameFr: 'name.fr',
      roleFr: 'role.fr',
      media: 'photo',
    },
    prepare({ nameFr, roleFr, media }) {
      return {
        title: nameFr,
        subtitle: roleFr,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
