import { create } from 'zustand'
import type { PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'

type guess = { id?: string; value: string; skipped?: boolean }

type guessStore = {
  guesses: guess[]
  submitGuess: (guess: guess) => void
  skipGuess: () => void
}

type statusStore = {
  currentTrack: Track | null
  setCurrentTrack: (track: Track) => void
  level: number
  levelOver: boolean
  stage: 1 | 2 | 3 | 4 | 5 | 6
}

const useGuesses = create<guessStore>(set => ({
  guesses: [],
  submitGuess: guess => set(prev => ({ guesses: [...prev.guesses, guess] })),
  skipGuess: () =>
    set(prev => ({
      guesses: [...prev.guesses, { skipped: true, value: 'Skipped' }],
    })),
}))

const useStatus = create<statusStore>(set => ({
  currentTrack: null,
  setCurrentTrack: track => set({ currentTrack: track }),
  level: 1,
  levelOver: false,
  stage: 1,
}))

export { useGuesses, useStatus }
