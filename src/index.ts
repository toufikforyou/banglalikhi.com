import { Hono } from 'hono';
import BijoyToUnicode from './bijoy2unicode';
import UnicodeToBijoy from './unicode2bijoy';

type Bindings = {
	CACHE: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
	const username = 'toufikforyou';

	const repsCashe = await c.env.CACHE.get(username, 'json');

	if (repsCashe) {
		return c.json(repsCashe);
	}

	const resp = await fetch(`https://api.github.com/users/${username}/repos`, {
		headers: {
			'User-Agent': 'Cf Worker',
		},
	});

	const data = await resp.json();
	await c.env.CACHE.put(username, JSON.stringify(data));

	return c.json(resp);
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
