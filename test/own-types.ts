// Test how well the library behaves with user custom types
// This is required especially for user custom libraries, such as in this case:
// https://github.com/psteinroe/supabase-cache-helpers/blob/0fd15e5e324c8d7628faaefde125c23c5eec6d0a/packages/postgrest-core/tests/postgrest-parser.spec.ts#L16

import { PostgrestBuilder, PostgrestClient } from '../src'
import { Database } from './types'

const postgrest = new PostgrestClient<Database>('http://localhost:3000')

class SomeBuilder<Result, ThrowOnError extends boolean = false> {
  constructor(_: PostgrestBuilder<Result, ThrowOnError>) {}
}

test('SomeBuilder should work with `& PostgrestBuilder<Result, false>`', async () => {
  const filter = postgrest.from('users').select('status')

  new SomeBuilder(filter)
})

test('SomeBuilder should work with `& PostgrestBuilder<Result, true>`', async () => {
  const filter = postgrest.from('users').select('status').throwOnError()

  new SomeBuilder(filter)
})
