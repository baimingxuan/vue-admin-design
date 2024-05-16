import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.glob('./**/*.ts', { eager: true })

const mockModules = []
Object.keys(modules).forEach(key => {
  if (key.includes('/_')) return

  const module = modules[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  mockModules.push(...moduleList)
})

/**
 * Used in a production environment, need to manually import all modules.
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
