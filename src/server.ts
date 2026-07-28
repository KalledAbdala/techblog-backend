import "dotenv/config";

import { app } from ".//app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
======================================
TechBlog API
Running on http://localhost:${PORT}
======================================
`);
});