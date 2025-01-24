import unicodeConverter from './convert/unicode-converter';
import mappingMap from './push/mapping-map';

export default function UnicodeToBijoy(text: string): string {
	const mappings = new Map([...mappingMap.map(([k, v]) => [v, k] as [string, string])]);

	var remappingText = '';

	// Bijoy to Unicode remapping
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		const nextChar = text[i + 1];

		if (mappings.has(nextChar)) {
			remappingText += char + nextChar;
			console.log(mappings.get(nextChar));
			// console.log(mappings.has(char), char);
			i++;
		} else if (mappings.has(char)) {
			remappingText += nextChar;
			remappingText += char;
			i++;
		} else {
			remappingText += char;
		}
	}

	return unicodeConverter(remappingText);
}
