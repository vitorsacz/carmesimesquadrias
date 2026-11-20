/** Número do WhatsApp comercial da Carmesim (DDI + DDD + número). TODO (cliente): confirmar. */
export const WHATSAPP_NUMBER = '5511973046448'

/** Link do WhatsApp, opcionalmente com uma mensagem já escrita para o visitante só tocar em "Enviar". */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
