/**
 * Formateador de días de la semana y feriados
 * 
 * Este módulo proporciona funciones para formatear arrays de días de la semana
 * y feriados en strings legibles en español.
 * 
 * @module dayFormatter
 */

/**
 * Mapeo de días de la semana
 * - 1: Lunes
 * - 2: Martes
 * - 3: Miércoles
 * - 4: Jueves
 * - 5: Viernes
 * - 6: Sábado
 * - 7: Domingo
 * - 8: Feriados
 */
const daysOfWeek = [
  { key: 1, label: 'Lunes' },
  { key: 2, label: 'Martes' },
  { key: 3, label: 'Miércoles' },
  { key: 4, label: 'Jueves' },
  { key: 5, label: 'Viernes' },
  { key: 6, label: 'Sábado' },
  { key: 7, label: 'Domingo' },
]

/**
 * Formatea un array de días de la semana y feriados en un string legible en español.
 * 
 * Reglas de formateo:
 * - 1 día: retorna el nombre del día (ej: "Lunes" o "Feriados")
 * - 2 días: "día1 y día2" (ej: "Lunes y Martes")
 * - >2 días consecutivos: "día1 a último día" (ej: "Lunes a Viernes")
 * - >2 días no consecutivos: "día1, día2 y último día" (ej: "Lunes, Miércoles y Viernes")
 * - Si hay feriados (día 8), se agregan al final con "y Feriados"
 * 
 * @param days - Array de números representando los días:
 *   - 1-7: días de la semana (Lunes a Domingo)
 *   - 8: Feriados
 * 
 * @returns String formateado con los días en español
 * 
 * @example
 * ```typescript
 * // Días individuales
 * formatDaysLabel([1]) // "Lunes"
 * formatDaysLabel([8]) // "Feriados"
 * 
 * // Dos días
 * formatDaysLabel([1, 2]) // "Lunes y Martes"
 * formatDaysLabel([1, 8]) // "Lunes y Feriados"
 * 
 * // Días consecutivos
 * formatDaysLabel([1, 2, 3, 4, 5]) // "Lunes a Viernes"
 * formatDaysLabel([1, 2, 3, 4, 5, 8]) // "Lunes a Viernes y Feriados"
 * 
 * // Días no consecutivos
 * formatDaysLabel([1, 2, 3, 5]) // "Lunes a Miércoles y Viernes"
 * formatDaysLabel([1, 3, 5]) // "Lunes, Miércoles y Viernes"
 * formatDaysLabel([1, 2, 5]) // "Lunes, Martes y Viernes"
 * ```
 */
export const formatDaysLabel = (days: number[]): string => {
  if (days.length === 0) return ''
  if (days.length === 1) {
    const day = days[0]
    if (day === 8) return 'Feriados'
    return daysOfWeek.find((d) => d.key === day)?.label || ''
  }
  
  // Separar días de la semana (1-7) de feriados (8)
  const weekDays = days.filter((day) => day >= 1 && day <= 7).sort((a, b) => a - b)
  const hasHolidays = days.includes(8)
  
  // Función para obtener el label de un día
  const getDayLabel = (day: number): string => {
    return daysOfWeek.find((d) => d.key === day)?.label || ''
  }
  
  // Si solo hay feriados
  if (weekDays.length === 0) {
    return 'Feriados'
  }
  
  // Identificar grupos consecutivos de días de la semana
  const groups: Array<number[]> = []
  let currentGroup: number[] = [weekDays[0]]
  
  for (let i = 1; i < weekDays.length; i++) {
    if (weekDays[i] === weekDays[i - 1] + 1) {
      // Es consecutivo, agregar al grupo actual
      currentGroup.push(weekDays[i])
    } else {
      // No es consecutivo, guardar el grupo actual y empezar uno nuevo
      groups.push(currentGroup)
      currentGroup = [weekDays[i]]
    }
  }
  groups.push(currentGroup)
  
  // Calcular total de días individuales (incluyendo feriados)
  const totalDays = weekDays.length + (hasHolidays ? 1 : 0)
  
  // Formatear cada grupo
  const formattedGroups: string[] = []
  for (const group of groups) {
    if (group.length === 1) {
      formattedGroups.push(getDayLabel(group[0]))
    } else if (group.length === 2) {
      // Dos días consecutivos
      // Si hay más de 2 días totales, usar coma; si no, usar "y"
      if (totalDays > 2) {
        formattedGroups.push(`${getDayLabel(group[0])}, ${getDayLabel(group[1])}`)
      } else {
        formattedGroups.push(`${getDayLabel(group[0])} y ${getDayLabel(group[1])}`)
      }
    } else {
      // Más de 2 días consecutivos: día1 'a' último día
      formattedGroups.push(`${getDayLabel(group[0])} a ${getDayLabel(group[group.length - 1])}`)
    }
  }
  
  // Agregar feriados si existen
  if (hasHolidays) {
    formattedGroups.push('Feriados')
  }
  
  // Unir todos los grupos
  if (formattedGroups.length === 1) {
    return formattedGroups[0]
  } else if (formattedGroups.length === 2) {
    return `${formattedGroups[0]} y ${formattedGroups[1]}`
  } else {
    // Más de 2 grupos: separar con comas y "y" antes del último
    const lastGroup = formattedGroups.pop() || ''
    return `${formattedGroups.join(', ')} y ${lastGroup}`
  }
}

