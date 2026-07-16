'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  /** Custom fallback content (default: standard error card) */
  fallback?: ReactNode;
  /** Called when error is caught — useful for error reporting */
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * React error boundary.
 * Catches runtime errors in the component tree and renders a recovery UI
 * instead of crashing the whole page. Required by WP10.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[FaultTrace ErrorBoundary]', error, info.componentStack);
    this.props.onError?.(error, info);
  }

  recover() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          className="rounded-xl border border-red-500/25 bg-red-500/5 p-6 flex flex-col gap-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-300">Component Error</p>
              <p className="text-xs text-red-400/80 mt-1 font-mono">
                {this.state.error?.message ?? 'An unexpected error occurred.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => this.recover()}
            className="self-start inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/[0.05] transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
