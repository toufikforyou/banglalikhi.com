import BijoyToUnicode from './src/bijoy2unicode';
import UnicodeToBijoy from './src/unicode2bijoy';

const bijoy2unicode = (text: string): string => {
	return BijoyToUnicode(text);
};

const unicode2bijoy = (text: string): string => {
	return UnicodeToBijoy(text);
};

export default { bijoy2unicode, unicode2bijoy };
