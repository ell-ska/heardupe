import { create } from 'zustand'
import type { Track } from '@spotify/web-api-ts-sdk'

type State = {
  guesses: { value: string; skipped?: boolean; id?: string }[]
  stage: number
  level: number
  isLevelOver: boolean
  isLevelWon: boolean
  isGameOver: boolean
  isPlaying: boolean
  amountOfLevels: number
  currentTrack: Track | null
  levelScore: number
  totalScore: number
  // highScore: number
}

type Actions = {
  setAmountOfLevels: (number: number) => void
  setCurrentTrack: (track: Track) => void
  setIsPlaying: (state: boolean) => void
  next: (type?: 'stage' | 'level' | 'reveal-answer') => void
  submitGuess: (guess: { value: string; id: string }) => void
  skipGuess: () => void
  reset: () => void
}

const initialGameState: State = {
  guesses: [],
  stage: 1,
  level: 1,
  isLevelOver: false,
  isLevelWon: false,
  isGameOver: false,
  isPlaying: false,
  amountOfLevels: 0,
  currentTrack: null,
  levelScore: 600,
  totalScore: 0,
  // highScore: 0,
}

const useGame = create<State & Actions>((set, get) => ({
  ...initialGameState,

  setAmountOfLevels: number => set({ amountOfLevels: number }),
  setCurrentTrack: track => set({ currentTrack: track }),
  setIsPlaying: state => set({ isPlaying: state }),

  next: type =>
    set(() => {
      if (type === 'level') {
        if (get().level < get().amountOfLevels - 1) {
          return {
            level: get().level + 1,
            isLevelOver: false,
            isLevelWon: false,
            guesses: [],
            stage: 1,
            isPlaying: false,
            levelScore: 600,
          }
        } else {
          return { isGameOver: true }
        }
      } else if (type === 'reveal-answer') {
        return { isLevelOver: true, isLevelWon: false }
      } else {
        if (get().stage < 6) {
          return { stage: get().stage + 1, levelScore: get().levelScore - 100 }
        } else {
          return { isLevelOver: true, isLevelWon: false }
        }
      }
    }),

  submitGuess: guess =>
    set(() => {
      if (guess.id === get().currentTrack?.id) {
        return {
          isLevelOver: true,
          isLevelWon: true,
          totalScore: get().totalScore + get().levelScore,
        }
      } else if (get().guesses.find(prevGuess => prevGuess.id === guess.id)) {
        console.log('duplicate guess')
        return {}
      } else {
        get().next()
        return { guesses: [...get().guesses, guess] }
      }
    }),
  skipGuess: () =>
    set(() => {
      get().next()
      return {
        guesses: [...get().guesses, { skipped: true, value: 'Skipped' }],
      }
    }),

  reset: () => set(initialGameState),
}))

export { useGame }
