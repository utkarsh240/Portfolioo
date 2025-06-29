'use client'
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default class GlobalErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can log error info here if needed
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: 32, background: '#1a1a1a', minHeight: '100vh' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.message || String(this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
} 