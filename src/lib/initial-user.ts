import React, { use } from 'react'
import { currentUser } from '@clerk/nextjs/server'
import prisma from './db'

const initialUser = async () => {
  const user = await currentUser()
  console.log(user)
  if (!user)
    return null

  const profile = await prisma.user.findUnique({
    where: {
      userId: user.id
    }
  })

  if (profile)
    return profile

  const newProfile = await prisma.user.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })
  return newProfile
}

export default initialUser