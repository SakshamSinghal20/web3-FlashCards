// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useFlashcardContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const { totalCards, addCard, state } = useFlashcardContract()

  const handleAdd = async () => {
    if (!question || !answer) return
    try {
      await addCard(question, answer)
      setQuestion("")
      setAnswer("")
    } catch (err) {
      console.error(err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please connect your wallet to continue.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Flashcards</h1>

      <div className="mb-6 p-4 border rounded-lg">
        <p className="text-sm text-muted-foreground mb-1">Total Flashcards</p>
        <p className="text-2xl font-semibold">{totalCards}</p>
      </div>

      <div className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleAdd}
          disabled={state.isLoading}
          className="w-full bg-primary text-primary-foreground py-2 rounded"
        >
          {state.isLoading ? "Adding..." : "Add Flashcard"}
        </button>
      </div>

      {state.hash && (
        <div className="mt-6 p-4 border rounded">
          <p className="text-xs text-muted-foreground mb-2">Transaction Hash</p>
          <p className="break-words text-sm">{state.hash}</p>
        </div>
      )}

      {state.error && (
        <p className="mt-4 text-red-500">Error: {state.error.message}</p>
      )}
    </div>
  )
}

export default SampleIntregation
