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