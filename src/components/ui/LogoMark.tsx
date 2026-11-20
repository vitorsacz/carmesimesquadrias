import styles from './LogoMark.module.css'

interface Props {
  size?: number
}

export function LogoMark({ size = 36 }: Props) {
  return (
    <span
      className={styles.mark}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      C
    </span>
  )
}
