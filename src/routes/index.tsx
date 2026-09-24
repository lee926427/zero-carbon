import { createFileRoute } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>Welcome to TanStack Start</h1>
      <p {...stylex.props(styles.subtitle)}>
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  )
}

const styles = stylex.create({
  container: {
    padding: '2rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '1rem',
    fontSize: '1.125rem',
  },
})
