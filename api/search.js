module.exports = function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method !== 'POST') {
        return res.status(200).json({ message: 'API funcionando! Use POST para buscar.' });
    }

    var query = req.body.query;
    var SERPER_API_KEY = process.env.SERPER_API_KEY;

    if (!SERPER_API_KEY) {
        return res.status(500).json({ error: 'API Key nao configurada' });
    }

    fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
            'X-API-KEY': SERPER_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: query, gl: 'br', hl: 'pt-br', num: 10 })
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
        var results = data.organic || [];
        var content = results.map(function(r) { return r.title + ': ' + r.snippet; }).join('\n\n');
        res.status(200).json({ success: true, content: content, results: results });
    })
    .catch(function(error) {
        res.status(500).json({ error: error.message });
    });
};
```

---

### 3. Commit e aguarde 2 minutos

---

### 4. Teste:
```
https://quiz-search-api.vercel.app/api/search
