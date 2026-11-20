'use client'

import { useEffect } from 'react'

const VLIBRAS_ORIGIN = 'https://vlibras.gov.br/app'
const SCRIPT_ID = 'vlibras-plugin'

type VLibrasWindow = Window & {
  VLibras?: { Widget: new (url: string) => unknown }
}

/** Atributos próprios do VLibras (vw, vw-access-button…), que o React repassa ao HTML como estão. */
const vw = (name: string) => ({ [name]: '' }) as Record<string, string>

/**
 * Widget oficial do VLibras (Governo Federal), que traduz o conteúdo da página para Libras.
 * Só faz sentido nas páginas em português, então o layout o renderiza apenas em /pt.
 */
export function VLibras() {
  useEffect(() => {
    const w = window as VLibrasWindow

    const init = () => {
      if (!w.VLibras) return
      new w.VLibras.Widget(VLIBRAS_ORIGIN)
      // O widget se monta no evento "load" da janela. Num app Next ele já passou
      // quando o script termina de carregar, então disparamos a inicialização manualmente.
      if (document.readyState === 'complete' && typeof window.onload === 'function') {
        window.onload(new Event('load'))
      }
    }

    // Adia para depois do carregamento da página: não pesa na primeira exibição.
    // O timeout também evita inicializar duas vezes com o StrictMode do React em desenvolvimento.
    const timer = window.setTimeout(() => {
      if (w.VLibras) return init()
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = `${VLIBRAS_ORIGIN}/vlibras-plugin.js`
        script.async = true
        document.body.appendChild(script)
      }
      script.addEventListener('load', init, { once: true })
    }, 1500)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div {...vw('vw')} className="enabled">
      <div {...vw('vw-access-button')} className="active" />
      <div {...vw('vw-plugin-wrapper')}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  )
}
