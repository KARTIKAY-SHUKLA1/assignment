/// <reference types="vitest" />

import type { 
  TestFunction, 
  SuiteFactory, 
  ExpectStatic, 
  MockedFunction 
} from 'vitest'

declare global {
  var describe: SuiteFactory
  var it: TestFunction
  var test: TestFunction  
  var expect: ExpectStatic
  var vi: typeof import('vitest')['vi']
  var beforeEach: (fn: () => void) => void
  var afterEach: (fn: () => void) => void
  var beforeAll: (fn: () => void) => void
  var afterAll: (fn: () => void) => void
}