"use client"

import React from 'react';
import { ThemeProvider } from 'next-themes';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';


type Props = {
    children : React.ReactNode;
}

const queryClient = new QueryClient();

export default function LayoutContainer({children}: Props) {
  return (
    <ThemeProvider  attribute="class" >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}