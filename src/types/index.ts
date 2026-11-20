export type Locale = 'pt' | 'en' | 'es'

export interface ObraFoto {
  src: string
  alt: string
  width: number
  height: number
}

export interface ObraData {
  slug: string
  titulo: string
  tipo: string
  descricao: string
  produtos: string[]
  status: string
  mostrarNaHome: boolean
  cover: ObraFoto
  galeria: ObraFoto[]
  antesDepois?: {
    antes: ObraFoto
    depois: ObraFoto
  }[]
  video?: string
}
