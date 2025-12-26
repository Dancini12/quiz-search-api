module.exports = function(req, res) {
    res.status(200).json({ ok: true, message: 'Funcionando!' });
};
```

5. Clique em **"Commit new file"**

---

### Teste após 2 minutos:
```
https://quiz-search-api.vercel.app/api/teste
