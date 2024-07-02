'use client'

import { useEffect, useRef, useMemo } from 'react'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import type { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'

import { PlaylistCard } from './PlaylistCard'
import { getUserPlaylists } from '@/actions/get-user-playlists'
import { Loader } from '@/components/Icons'

const getLargeCardIndexes = (length: number) => {
  let indexes = []
  let current = 6
  let increment: 7 | 11 = 7

  while (current <= length) {
    indexes.push(current)
    current += increment
    increment = increment === 11 ? 7 : 11
  }

  return indexes
}

export const PlaylistGallery = ({
  initialPlaylists,
}: {
  initialPlaylists: Page<SimplifiedPlaylist>
}) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['playlists'],
      queryFn: async (args: {
        pageParam: { limit: number; offset: number } | undefined
      }) => {
        if (args.pageParam) {
          return await getUserPlaylists(args.pageParam)
        } else {
          return await getUserPlaylists({ limit: 13, offset: 0 })
        }
      },
      getNextPageParam: lastPlaylist => {
        const offset = lastPlaylist.limit + lastPlaylist.offset
        const limit = offset % 2 === 0 ? 7 : 11

        return limit + offset < lastPlaylist.total
          ? { limit, offset }
          : undefined
      },
      initialData: {
        pages: [initialPlaylists],
        pageParams: [undefined],
      },
      initialPageParam: undefined,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 5, // 5 min
    })

  const currentPlaylists = data.pages.map(page => page.items).flat()
  const largeCardIndexes = useMemo(
    () => getLargeCardIndexes(initialPlaylists.total),
    [initialPlaylists.total],
  )

  if (currentPlaylists.length === 0) return null

  return (
    <div className='mb-8 flex flex-col items-center gap-8'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {currentPlaylists.map((playlist, index) => {
          const lg = largeCardIndexes.includes(index)
          return <PlaylistCard key={playlist.id} {...playlist} lg={lg} />
        })}
      </div>
      <PlaylistGallerySpinner
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onFetchNextPage={fetchNextPage}
      />
    </div>
  )
}

const PlaylistGallerySpinner = ({
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
}: {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onFetchNextPage: () => void
}) => {
  const loadNextDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { current } = loadNextDiv
    if (!current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && !isFetchingNextPage) {
          onFetchNextPage()
        }
      },
      {
        rootMargin: '400px',
        threshold: 0,
      },
    )

    observer.observe(current)
    return () => {
      observer.unobserve(current)
    }
  }, [loadNextDiv, onFetchNextPage, isFetchingNextPage])

  if (!hasNextPage) {
    return null
  }

  return (
    <div ref={loadNextDiv}>
      <Loader />
    </div>
  )
}
