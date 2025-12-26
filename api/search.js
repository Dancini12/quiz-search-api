export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Use POST' });
    }

    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query obrigatoria' });
        }

        const SERPER_API_KEY = process.env.SERPER_API_KEY;

        if (!SERPER_API_KEY) {
            return res.status(500).json({ error: 'API Key nao configurada' });
        }

        const response = await fetch('https://google.serper.dev/search', {
            method: 'POST',
            headers: {
                'X-API-KEY': SERPER_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: query + ' site:brasilescola.uol.com.br OR site:infoescola.com OR site:gov.br OR site:britannica.com OR site:scielo.br',
                gl: 'br',
                hl: 'pt-br',
                num: 10
            })
        });

        if (!response.ok) {
            throw new Error('Erro Serper: ' + response.status);
        }

        const data = await response.json();
        const results = (data.organic || []);
        const content = results.map(r => r.title + ': ' + r.snippet).join('\n\n');

        return res.status(200).json({
            success: true,
            content: content,
            results: results.map(r => ({
                title: r.title,
                link: r.link,
                snippet: r.snippet
            }))
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
```

---

### 5. Clique no botão verde "Commit changes"

---

### 6. Aguarde 2 minutos e teste:
```
https://quiz-search-api.vercel.app/api/search
