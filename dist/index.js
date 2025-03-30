const express = require('express');
const { parseMarkdown } = require('./markdown.js');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('input', { });
});

app.get('/parse-markdown', (req, res) => {
    const base64Markdown = req.query.markdown;
    if (!base64Markdown) {
        return res.status(400).send('No markdown content provided');
    }

    try {
        const markdown = atob(base64Markdown);
        const html = parseMarkdown(markdown);
        res.render('view', { content: html });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error parsing markdown');
    }
});

app.listen(port, () => {
    console.log(`Markdown parser app listening at http://localhost:${port}`);
});
