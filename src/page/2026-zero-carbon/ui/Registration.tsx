import * as stylex from '@stylexjs/stylex'
import { useLoaderData } from '@tanstack/react-router'

import { media } from '@/shared/styles/constants.stylex'
import { color } from '@/shared/styles/tokens.stylex'
import { typography } from '@/shared/styles/typography.stylex'

import { SectionWrapper } from './SectionWrapper'

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      [media.desktop]: 'row',
    },
    alignItems: 'center',
    maxWidth: '960px',
    margin: '0 auto',
  },
  image: {
    width: '184px',
    aspectRatio: 1 / 1,
    order: {
      default: 1,
      [media.desktop]: 2,
    },
    backgroundColor: color.secondary,
  },
  paragraph: {
    margin: '0 1rem',
    order: {
      default: 2,
      [media.desktop]: 1,
    },
  },
  registrationOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '40px',
  },
  link: {
    color: 'white',
    cursor: 'pointer',
    backgroundColor: color.accent,
    textAlign: 'center',
    padding: '12px',
    gap: '10px',
    borderRadius: '16px',
    textDecoration: 'none',
  },
})

export function Registration() {
  const data = useLoaderData({ from: '/2026-zero-carbon/' })

  if (!data || !data.metadata.pageInfo.registration.content) {
    return null
  }

  return (
    <SectionWrapper title="報名資訊" id="registration">
      <div {...stylex.props(styles.container)}>
        <p
          {...stylex.props(styles.paragraph, typography.paragraph)}
          dangerouslySetInnerHTML={{
            __html: data.metadata.pageInfo.registration.content,
          }}
        />
      </div>
      {/* <div {...stylex.props(styles.registrationOptions)}>
        <a
          {...stylex.props(styles.link, typography.registrationLink)}
          href="https://mirrormedia.oen.tw/events/3ECnDDv7zxjsXxLelvVFXQlqWPd"
          target="_blank"
          rel="noopener noreferrer"
        >
          信用卡報名
        </a>
        <a
          {...stylex.props(styles.link, typography.registrationLink)}
          href="https://forms.gle/nhKaxJRBsyGPcZPF6"
          target="_blank"
          rel="noopener noreferrer"
        >
          匯款報名
        </a>
      </div> */}
    </SectionWrapper>
  )
}
