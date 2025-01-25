import mappingMap from '../common/mapping/re-arrangement-map';
import unicodeConverter from '../converters/unicode-converter';

export default function UnicodeToBijoy(text: string): string {
	const mappings = new Map([...mappingMap.map(([k, v]) => [v, k] as [string, string])]);

	var remappingText = '';

	// Bijoy to Unicode remapping
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		const nextChar = text[i + 1];

		if (mappings.has(nextChar)) {
			remappingText += char + nextChar;
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
