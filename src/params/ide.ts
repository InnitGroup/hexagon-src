import type { ParamMatcher } from '@sveltejs/kit'

export const match: ParamMatcher = (param) => param === 'IDE' || param === 'ide'
