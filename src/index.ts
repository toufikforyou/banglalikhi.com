import { Hono } from 'hono';
import IndexPage from '../public/index';
import BijoyToUnicode from './bijoy2unicode';
import UnicodeToBijoy from './unicode2bijoy';

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

// POST routes for API
app.post('/api/unicode', async (c) => {
	try {
		const { text } = await c.req.json();
		const convertedText = BijoyToUnicode(text);
		return c.json({
			status: 200,
			message: "Successfully converted to Unicode",
			data: convertedText
		});
	} catch (error: any) {
		return c.json({
			status: 400,
			message: "Failed to convert text",
			error: error?.message || "Unknown error"
		}, 400);
	}
});

// POST route for API
app.post('/api/bijoy', async (c) => {
	try {
		const { text } = await c.req.json();
		const convertedText = UnicodeToBijoy(text);
		return c.json({
			status: 200,
			message: "Successfully converted to Bijoy",
			data: convertedText
		});
	} catch (error: any) {
		return c.json({
			status: 400,
			message: "Failed to convert text",
			error: error?.message || "Unknown error"
		}, 400);
	}
});

export default app;
