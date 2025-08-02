// Boton reutilizable para ir a la lista de pokemones
'use client'
export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.href = '/pokemon'}
    >
      Volver
    </button>
  )
}
