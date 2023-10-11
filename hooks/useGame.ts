import { create, type StateCreator } from 'zustand'
import type { Track } from '@spotify/web-api-ts-sdk'

type StateSlice = {
  guesses: { value: string; skipped?: boolean; id?: string }[]
  stage: number
  level: number
  isLevelOver: boolean
  levelOver: () => void
  isLevelWon: boolean
  isGameOver: boolean
  isPlaying: boolean
  setIsPlaying: (state: boolean) => void
}

const createStateSlice: StateCreator<StateSlice> = set => ({
  guesses: [],
  stage: 1,
  level: 1,
  isLevelOver: false,
  levelOver: () => set({ isLevelOver: true }),
  isLevelWon: false,
  isGameOver: false,
  isPlaying: false,
  setIsPlaying: state => set({ isPlaying: state }),
})

type InfoSlice = {
  amountOfLevels: number
  setAmountOfLevels: (number: number) => void
  currentTrack: Track | null
  setCurrentTrack: (track: Track) => void
}

const createInfoSlice: StateCreator<InfoSlice> = set => ({
  amountOfLevels: 0,
  setAmountOfLevels: number => set({ amountOfLevels: number }),
  currentTrack: null,
  setCurrentTrack: track => set({ currentTrack: track }),
})

type NextSlice = {
  next: (type?: 'stage' | 'level') => void
}

const createNextSlice: StateCreator<
  StateSlice & InfoSlice,
  [],
  [],
  NextSlice
> = (set, get) => ({
  next: type =>
    set(() => {
      if (type === 'level') {
        if (get().level < get().amountOfLevels - 1) {
          return {
            level: get().level + 1,
            isLevelOver: false,
            guesses: [],
            stage: 1,
            isPlaying: false,
          }
        } else {
          return { isGameOver: true }
        }
      } else {
        if (get().stage < 6) {
          return { stage: get().stage + 1 }
        } else {
          return { isLevelOver: true }
        }
      }
    }),
})

type SubmitSlice = {
  submitGuess: (guess: { value: string; id: string }) => void
  skipGuess: () => void
}

const createSubmitSlice: StateCreator<
  StateSlice & InfoSlice & NextSlice,
  [],
  [],
  SubmitSlice
> = (set, get) => ({
  submitGuess: guess =>
    set(() => {
      console.log('submitted')
      if (guess.id === get().currentTrack?.id) {
        console.log('correct')
        return { isLevelOver: true, isLevelWon: true }
      } else if (get().guesses.find(prevGuess => prevGuess.id === guess.id)) {
        console.log('duplicate guess')
        return {}
      } else {
        console.log('wrong')
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
})

const useGame = create<StateSlice & InfoSlice & NextSlice & SubmitSlice>()(
  (...a) => ({
    ...createStateSlice(...a),
    ...createInfoSlice(...a),
    ...createNextSlice(...a),
    ...createSubmitSlice(...a),
  }),
)

export { useGame }
