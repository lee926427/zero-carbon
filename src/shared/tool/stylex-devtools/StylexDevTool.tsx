import { useEffect } from 'react'

function DevStyleXInjectImpl() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      // @ts-ignore
      void import('virtual:stylex:css-only')
    }
  }, [])
  return <link rel="stylesheet" href="/virtual:stylex.css" />
}

export function StylexDevTool({ cssHref }: { cssHref: string }) {
  useEffect(() => {
    if (import.meta.env.DEV) {
      // @ts-ignore
      void import('virtual:stylex:css-only')
    }
  }, [])
  return import.meta.env.DEV ? (
    <DevStyleXInjectImpl />
  ) : (
    <link rel="stylesheet" href={cssHref} />
  )
}
