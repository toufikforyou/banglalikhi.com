import { Hono } from 'hono';
import IndexPage from '../public/index';
import BijoyToUnicode from './bijoy2unicode/bijoy2unicode';
import UnicodeToBijoy from './unicode2bijoy/unicode2bijoy';

type Bindings = {
	CACHE: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
	const homepage = 'homepage';
	const cachedHomepage = await c.env.CACHE.get(homepage);
	if (cachedHomepage) {
		return c.html(cachedHomepage);
	}

	const data = IndexPage();
	await c.env.CACHE.put(homepage, data);

	return c.html(data);
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
