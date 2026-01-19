/**
 * Migration script to convert team member names from string to localized object
 * 
 * Run this script with:
 * npx sanity exec migrations/migrate-team-members.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

interface OldTeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  role: { fr: string; en: string; ru?: string }
  [key: string]: unknown
}

interface NewTeamMember {
  _id: string
  _type: 'teamMember'
  name: { fr: string; en: string; ru?: string }
  role: { fr: string; en: string; ru?: string }
  [key: string]: unknown
}

async function migrateTeamMembers() {
  console.log('🔍 Fetching team members...')
  
  const teamMembers = await client.fetch<OldTeamMember[]>(
    `*[_type == "teamMember" && !(_id in path("drafts.**"))]`
  )

  console.log(`📊 Found ${teamMembers.length} team members`)

  const membersToMigrate = teamMembers.filter(
    (member) => typeof member.name === 'string'
  )

  if (membersToMigrate.length === 0) {
    console.log('✅ All team members are already migrated!')
    return
  }

  console.log(`🔄 Migrating ${membersToMigrate.length} team members...`)

  const transaction = client.transaction()

  membersToMigrate.forEach((member) => {
    const oldName = member.name as string
    
    // Create localized name object
    const newName = {
      fr: oldName,
      en: oldName, // Use same name for English (can be updated manually later)
      ru: oldName, // Use same name for Russian (can be updated manually later)
    }

    console.log(`  - Migrating: ${oldName}`)

    transaction.patch(member._id, {
      set: {
        name: newName,
      },
    })
  })

  console.log('💾 Committing changes...')
  await transaction.commit()

  console.log('✅ Migration completed successfully!')
  console.log(`📝 ${membersToMigrate.length} team members have been migrated`)
  console.log('\n⚠️  Note: All names have been duplicated across languages.')
  console.log('   You may want to manually update the English and Russian translations.')
}

migrateTeamMembers()
  .then(() => {
    console.log('\n🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })
