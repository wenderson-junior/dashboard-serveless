import { h } from 'vue'

// Importa os ícones como URLs para uso em <img>
const iconUrls = import.meta.glob('@/assets/icons/*.svg', { eager: true, import: 'default' })

// Importa os ícones como conteúdo bruto para manipulação
const iconRaw = import.meta.glob('@/assets/icons/*.svg', { eager: true, query: '?raw', import: 'default' })

/**
 * Retorna o caminho da URL para um ícone
 * @param {string} iconName - Nome do ícone sem extensão
 * @returns {string} URL do ícone
 */
export function getIconPath(iconName) {
  return iconUrls[`/src/assets/icons/${iconName}.svg`] || ''
}

/**
 * Cria um componente SVG que herda a cor atual (currentColor)
 * @param {string} iconName - Nome do ícone sem extensão
 * @returns {VNode} Componente Vue renderizável
 */
export function getSvgIcon(iconName) {
  const iconPath = `/src/assets/icons/${iconName}.svg`
  const svgContent = iconRaw[iconPath] || ''

  // Substitui fill fixo por currentColor para herdar a cor do texto
  const svgWithCurrentColor = svgContent.replace(/fill="[^"]*"/g, 'fill="currentColor"')

  // Cria componente SVG dinâmico
  return h('div', { innerHTML: svgWithCurrentColor, class: 'svg-icon' })
}
