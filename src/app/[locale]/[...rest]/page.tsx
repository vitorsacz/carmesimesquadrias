import { notFound } from 'next/navigation'

/** Qualquer caminho desconhecido dentro de /pt, /en ou /es cai na página 404 traduzida. */
export default function CatchAllPage() {
  notFound()
}
