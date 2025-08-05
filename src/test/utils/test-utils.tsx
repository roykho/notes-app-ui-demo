import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { AllTheProviders } from './providers'

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Export the custom render function
export { customRender as render }

// Export specific items from testing-library instead of using export *
export {
  screen,
  waitFor,
  fireEvent,
  within,
  waitForElementToBeRemoved,
  act,
  cleanup,
  configure,
  getDefaultNormalizer,
  getQueriesForElement,
  getRoles,
  isInaccessible,
  logRoles,
  logDOM,
  prettyDOM,
  queries,
  queryHelpers,
} from '@testing-library/react'

// Export type separately
export type { waitForOptions } from '@testing-library/react'