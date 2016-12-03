const KEY = 'survey'

export default {
	fetch () {
		return JSON.parse(window.localStorage.getItem(KEY) || '{}')
	},
	save (store) {
		window.localStorage.setItem(KEY, JSON.stringify(store))
	}
}