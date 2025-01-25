import banglaAlphabets from '../common/bangladeshi-bangla-alphabets';
import joinedAlphabets from '../common/bangladeshi-joined-alphabets';
import numberAlphabets from '../common/bangladeshi-number-alphabets';
import signAlphabets from '../common/bangladeshi-sign-alphabets';
import vowelAlphabets from '../common/bangladeshi-vowel-alphabets';
import vowelSignAlphabets from '../common/bangladeshi-vowel-sign-alphabets';

export default function bijoyConverter(text: string): string {
	const mappings = new Map([
		...banglaAlphabets.map(([k, v]) => [k, v] as [string, string]),
		...vowelAlphabets.map(([k, v]) => [k, v] as [string, string]),
		...vowelSignAlphabets.map(([k, v]) => [k, v] as [string, string]),
		...numberAlphabets.map(([k, v]) => [k, v] as [string, string]),
		...signAlphabets.map(([k, v]) => [k, v] as [string, string]),
		...joinedAlphabets.map(([k, v]) => [k, v] as [string, string]),
	]);

	let convertedText = '';
	let i = 0;

	while (i < text.length) {
		let char = text[i];
		let nextChar = text[i + 1] || '';

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
