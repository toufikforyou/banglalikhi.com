export default function IndexPage(): string {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Bangladesh Language Converter</title>
		<style>
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				font-family: 'Arial', sans-serif;
			}
			body { background: #f0f2f5; }
			.container {
				max-width: 1200px;
				margin: 0 auto;
				padding: 20px;
			}
			.header {
				text-align: center;
				padding: 40px 0;
			}
			.header h1 {
				font-size: 3rem;
				margin-bottom: 20px;
			}
			.gradient-text {
				background: linear-gradient(45deg, #006a4e, #f42a41);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				font-weight: bold;
			}
			.converter-container {
				display: flex;
				gap: 20px;
				margin-top: 40px;
				flex-wrap: wrap;
			}
			.converter-box {
				flex: 1;
				min-width: 300px;
				background: white;
				padding: 20px;
				border-radius: 10px;
				box-shadow: 0 2px 10px rgba(0,0,0,0.1);
			}
			.converter-box h3 {
				margin-bottom: 15px;
				color: #333;
			}
			textarea {
				width: 100%;
				height: 200px;
				padding: 10px;
				border: 1px solid #ddd;
				border-radius: 5px;
				resize: none;
				margin-bottom: 10px;
				font-size: 16px;
			}
			button {
				background: #006a4e;
				color: white;
				border: none;
				padding: 10px 20px;
				border-radius: 5px;
				cursor: pointer;
				transition: background 0.3s;
			}
			button:hover {
				background: #005540;
			}
			.footer {
				text-align: center;
				margin-top: 40px;
				padding: 20px;
				color: #666;
			}
			@media (max-width: 768px) {
				.converter-container { flex-direction: column; }
				.header h1 { font-size: 2rem; }
			}
		</style>
	</head>
	<body>
		<div class="container">
			<header class="header">
				<h1>Bangladesh Language <span class="gradient-text">Converter</span></h1>
				<p>Convert between Bijoy and Unicode Bengali text easily</p>
			</header>

			<main class="converter-container">
				<div class="converter-box">
					<h3>Bijoy to Unicode</h3>
					<textarea id="bijoyText" placeholder="Enter Bijoy text here..."></textarea>
					<button id="bijoyToUnicode" onclick="convertToUnicode()">Convert to Unicode</button>
				</div>

				<div class="converter-box">
					<h3>Unicode to Bijoy</h3>
					<textarea id="unicodeText" placeholder="Enter Unicode text here..."></textarea>
					<!-- <button id="unicodeToBijoy" onclick="convertToBijoy()">Convert to Bijoy</button> -->
				</div>
			</main>

			<footer class="footer">
				<p>© 2024 Bangladesh Language Converter. All rights reserved.</p>
			</footer>
		</div>

		<script>
			async function convertToUnicode() {
				const bijoyText = document.getElementById('bijoyText').value;
				const button = document.querySelector('#bijoyToUnicode');
				try {
					button.disabled = true;
					button.textContent = 'Converting...';
					
					const response = await fetch('/api/unicode', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ text: bijoyText })
					});
					const data = await response.json();
					if (data.status === 200) {
						document.getElementById('unicodeText').value = data.data;
					} else {
						alert('Conversion failed: ' + data.message);
					}
				} catch (error) {
					alert('Error during conversion');
				} finally {
					button.disabled = false;
					button.textContent = 'Convert to Unicode';
				}
			}

			async function convertToBijoy() {
				const unicodeText = document.getElementById('unicodeText').value;
				const button = document.querySelector('#unicodeToBijoy');
				try {
					button.disabled = true;
					button.textContent = 'Converting...';

					const response = await fetch('/api/bijoy', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ text: unicodeText })
					});
					const data = await response.json();
					if (data.status === 200) {
						document.getElementById('bijoyText').value = data.data;
					} else {
						alert('Conversion failed: ' + data.message);
					}
				} catch (error) {
					alert('Error during conversion');
				} finally {
					button.disabled = false;
					button.textContent = 'Convert to Bijoy';
				}
			}
		</script>
	</body>
</html>`;
}
