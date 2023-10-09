import { create } from 'zustand'

type guess = { id?: string; value: string; skipped?: boolean }

type game = {
  guesses: guess[]
  submitGuess: (guess: guess) => void
  skipGuess: () => void
}

const useGame = create<game>(set => ({
  guesses: [],
  submitGuess: (guess: guess) =>
    set(prev => ({ guesses: [...prev.guesses, guess] })),
  skipGuess: () =>
    set(prev => ({
      guesses: [...prev.guesses, { skipped: true, value: 'Skipped' }],
    })),
}))

export { useGame }
