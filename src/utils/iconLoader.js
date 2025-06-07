const icons = import.meta.glob('@/assets/icons/*.svg', { eager: true, import: 'default' })

export function getIconPath(iconName) {
  return icons[`/src/assets/icons/${iconName}.svg`] || ''
}
