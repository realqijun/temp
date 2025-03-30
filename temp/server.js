const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 4000;

// Use cookie-parser middleware
app.use(cookieParser());

// Set a test cookie if it doesn't exist
app.use((req, res, next) => {
    if (!req.cookies.test_cookie) {
        res.cookie('test_cookie', 'HelloFromServer', { httpOnly: false, sameSite: 'Lax' });
    }
    next();
});

// Serve an HTML page that reads cookies
app.get('/', (req, res) => {
    res.send(`
        <h1>Cookie Reader</h1>
        <p>Click the button below to read cookies:</p>
        <button onclick="showCookies()">Show Cookies</button>
        <p id="cookie-display"></p>

        <script>
            function showCookies() {
                document.getElementById('cookie-display').innerText = document.cookie;
            }
        </script>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

