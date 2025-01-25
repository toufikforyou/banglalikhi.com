import { Hono } from 'hono';
import IndexPage from '../public/index';
import BijoyToUnicode from './bijoy2unicode/bijoy2unicode';
import UnicodeToBijoy from './unicode2bijoy/unicode2bijoy';

type Bindings = {
	CACHE: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
	return c.html(IndexPage());
});

app.get('/bijoy2unicode/:text', (c) => {
	const text = c.req.param('text');
	const convertedText = BijoyToUnicode(text!);
	return c.text(convertedText);
});
app.get('/unicode2bijoy/:text', (c) => {
	const text = c.req.param('text');
	const convertedText = UnicodeToBijoy(text!);
	return c.text(convertedText);
});

export default app;
