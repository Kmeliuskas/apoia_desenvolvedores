"use server"

import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function getStats(userId: string, stripeAccountId: string) {

  if (!userId) {
    return {
      error: "USUÁRIO NÃO AUTENTICADO"
    }
  }

  try {
    const totalDonations = await prisma.donation.count({
      where: {
        userId: userId,
        status: "PAID"
      }
    })

    const totalAmountDonated = await prisma.donation.aggregate({
      where: {
        userId: userId,
        status: "PAID"
      },
      _sum: {
        amount: true
      }
    })

    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountId
    })

    return {
      totalQtdDonations: totalDonations,
      totalAmountResult: totalAmountDonated._sum.amount ?? 0,
      balance: balance?.pending[0]?.amount ?? 0,
    }

  } catch (err) {
    return {
      error: "FALHA AO BUSCAR ESTATISTICAS"
    }
  }

}