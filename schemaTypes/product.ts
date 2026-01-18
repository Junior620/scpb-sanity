import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produit',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
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
      options: { source: 'name.fr', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ru', title: 'Русский', type: 'text' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Cacao', value: 'cacao' },
          { title: 'Café', value: 'cafe' },
          { title: 'Cajou', value: 'cajou' },
          { title: 'Sésame', value: 'sesame' },
          { title: 'Soja', value: 'soja' },
          { title: 'Bois', value: 'bois' },
          { title: 'Maïs', value: 'mais' },
          { title: 'Hévéa', value: 'hevea' },
          { title: 'Amandes', value: 'amandes' },
          { title: 'Sorgho', value: 'sorgho' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFlagship',
      title: 'Produit phare',
      description: 'Mettre en avant sur la page d\'accueil',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    // Origine et traçabilité
    defineField({
      name: 'origin',
      title: 'Origine',
      type: 'object',
      fields: [
        { name: 'region', title: 'Région', type: 'string', description: 'Ex: Sud-Ouest Cameroun' },
        { name: 'country', title: 'Pays', type: 'string', initialValue: 'Cameroun' },
      ],
    }),
    // Spécifications techniques (B2B)
    defineField({
      name: 'technicalSpecs',
      title: 'Spécifications techniques',
      description: 'Données techniques pour acheteurs B2B (chocolatiers, industriels)',
      type: 'object',
      fields: [
        { name: 'humidity', title: 'Humidité (%)', type: 'number', description: 'Ex: 7.5' },
        { name: 'fatContent', title: 'Teneur en matière grasse (%)', type: 'number', description: 'Pour cacao' },
        { name: 'grainCount', title: 'Grainage (fèves/100g)', type: 'number', description: 'Pour cacao - Ex: 95-100' },
        { name: 'fermentationDays', title: 'Jours de fermentation', type: 'number', description: 'Pour cacao' },
        { name: 'aromaticProfile', title: 'Profil aromatique', type: 'object', fields: [
          { name: 'fr', title: 'Français', type: 'text' },
          { name: 'en', title: 'English', type: 'text' },
          { name: 'ru', title: 'Русский', type: 'text' },
        ]},
        { name: 'grade', title: 'Grade qualité', type: 'string', description: 'Ex: Grade I, Grade II, Premium' },
        { name: 'standard', title: 'Norme de référence', type: 'string', description: 'Ex: ISO 2451, ICCO' },
      ],
    }),
    // Conditionnement export
    defineField({
      name: 'packaging',
      title: 'Conditionnement export',
      type: 'object',
      fields: [
        { name: 'type', title: 'Type', type: 'string', description: 'Ex: Sacs jute + liner PE' },
        { name: 'weight', title: 'Poids unitaire (kg)', type: 'number', description: 'Ex: 60, 65' },
        { name: 'containerCapacity', title: 'Capacité conteneur 20\'', type: 'string', description: 'Ex: 18-20 tonnes' },
      ],
    }),
    // Certifications disponibles
    defineField({
      name: 'certifications',
      title: 'Certifications disponibles',
      description: 'Selon origine, volume et filière partenaire',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'UTZ Certified', value: 'utz' },
          { title: 'Rainforest Alliance', value: 'rainforest' },
          { title: 'Fairtrade', value: 'fairtrade' },
          { title: 'Bio / Organic', value: 'organic' },
          { title: 'FLEGT (Bois)', value: 'flegt' },
          { title: 'Non-OGM (selon lots)', value: 'non-gmo' },
        ],
      },
    }),
    // Informations commerciales
    defineField({
      name: 'moq',
      title: 'MOQ (Quantité minimum)',
      type: 'string',
      description: 'Ex: 1 conteneur 20\' (18T)',
    }),
    defineField({
      name: 'availability',
      title: 'Disponibilité',
      type: 'object',
      fields: [
        { name: 'fr', title: 'Français', type: 'string', description: 'Ex: Octobre - Mars (récolte principale)' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ru', title: 'Русский', type: 'string' },
      ],
    }),
    defineField({
      name: 'incoterms',
      title: 'Incoterms proposés',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'FOB Douala', value: 'fob-douala' },
          { title: 'CIF', value: 'cif' },
          { title: 'CFR', value: 'cfr' },
        ],
      },
    }),
    // SEO
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
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name.fr',
      subtitle: 'category',
      media: 'image',
    },
  },
})
