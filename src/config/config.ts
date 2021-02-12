declare global {
  interface Window {
    forceException: boolean | undefined
  }
}

// エラー通知の仕組みの死活管理のために意図的に例外を発生させるためのバックドア的なやつ
export const FORCE_EXCEPTION = () => window.forceException ?? false
