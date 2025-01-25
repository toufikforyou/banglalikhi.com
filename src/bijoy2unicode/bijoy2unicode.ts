import mappingMap from '../common/mapping/re-arrangement-map';
import bijoyConverter from '../converters/bijoy-converter';

export default function BijoyToUnicode(text: string): string {
	const mappings = new Map([...mappingMap.map(([k, v]) => [k, v] as [string, string])]);

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

	return bijoyConverter(remappingText);
}
