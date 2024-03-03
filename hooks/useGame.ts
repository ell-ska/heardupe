import { create } from 'zustand'
import axios from 'axios'
import type { Track } from '@spotify/web-api-ts-sdk'

type Guess<Name extends string, Artists extends string> =
  | `${Name} - ${Artists}`
  | 'Skipped'

type State = {
  guesses: { value: Guess<string, string>; skipped?: boolean }[]
  stage: number
  level: number
  isLevelOver: boolean
  isLevelWon: boolean
  isGameOver: boolean
  isPlaying: boolean
  currentTrack: Track | null
  amountOfLevels: number
  id: string | null
  type: string | null
  levelScore: number
  totalScore: number
}

type Actions = {
  setInitialInfo: (info: {
    amountOfLevels: number
    type: string
    id: string
  }) => void
  setCurrentTrack: (track: Track) => void
  setIsPlaying: (state: boolean) => void
  next: (type?: 'stage' | 'level' | 'reveal-answer') => void
  submitGuess: (guess: Guess<string, string>) => void
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
  currentTrack: null,
  amountOfLevels: 0,
  id: null,
  type: null,
  levelScore: 600,
  totalScore: 0,
}

const useGame = create<State & Actions>((set, get) => ({
  ...initialGameState,

  setInitialInfo: ({ amountOfLevels, type, id }) =>
    set({ amountOfLevels, type, id }),
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
          axios.post('/api/game', {
            score: get().totalScore,
            id: get().id,
            type: get().type,
          })

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
      const track = get().currentTrack
      const correctGuess = `${track?.name} - ${track?.artists
        .map(artist => artist.name)
        .join(', ')}`

      if (guess === correctGuess) {
        return {
          isLevelOver: true,
          isLevelWon: true,
          totalScore: get().totalScore + get().levelScore,
        }
      } else if (get().guesses.find(prevGuess => prevGuess.value === guess)) {
        console.log('duplicate guess')
        return {}
      } else {
        get().next()
        return { guesses: [...get().guesses, { value: guess }] }
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
