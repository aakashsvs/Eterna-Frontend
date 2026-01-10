'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { makeStore, AppStore } from '../store/store'
import { useRef } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <ReduxProvider store={storeRef.current}>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  )
}
