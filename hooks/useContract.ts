// hooks/useContract.ts
"use client"

import { useEffect, useState } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface Flashcard {
  question: string
  answer: string
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export const useFlashcardContract = () => {
  const { address } = useAccount()

  const [isLoading, setIsLoading] = useState(false)

  const { data: totalCards, refetch: refetchTotal } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "totalCards",
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) {
      refetchTotal()
    }
  }, [isConfirmed, refetchTotal])

  const addCard = async (question: string, answer: string) => {
    if (!address || !question || !answer) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "addCard",
        args: [question, answer],
      })
    } catch (err) {
      console.error("Error adding flashcard:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  }

  return {
    totalCards: totalCards ? Number(totalCards as bigint) : 0,
    addCard,
    state,
  }
}
