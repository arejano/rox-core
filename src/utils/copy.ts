export default function copy(obj: any) {
	return JSON.parse(JSON.stringify(obj))
}
