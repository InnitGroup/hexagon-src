import { type RequestHandler, json } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	return json({ Response: { data: { UpgradeAction: 'NotRequired' } } })
}
