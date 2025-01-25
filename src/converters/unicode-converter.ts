import banglaAlphabets from '../common/bangladeshi-bangla-alphabets';
import joinedAlphabets from '../common/bangladeshi-joined-alphabets';
import numberAlphabets from '../common/bangladeshi-number-alphabets';
import signAlphabets from '../common/bangladeshi-sign-alphabets';
import vowelAlphabets from '../common/bangladeshi-vowel-alphabets';
import vowelSignAlphabets from '../common/bangladeshi-vowel-sign-alphabets';

export default function unicodeConverter(text: string): string {
	const mappings = new Map<string, string>([
		...banglaAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...vowelAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...vowelSignAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...numberAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...signAlphabets.map(([k, v]) => [v, k] as [string, string]),
		...joinedAlphabets.map(([k, v]) => [v, k] as [string, string]),
	]);

	let convertedText = '';
	let i = 0;

	while (i < text.length) {
		let char = text[i];
		let nextChar = text[i + 1] || '';

		// Handle joined alphabets
		if (mappings.has(char + nextChar)) {
			convertedText += mappings.get(char + nextChar);
			i += 2;
		} else if (mappings.has(char)) {
			convertedText += mappings.get(char);
			i++;
		} else {
			convertedText += char;
			i++;
		}
	}

	return convertedText;
}
