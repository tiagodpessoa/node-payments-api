import { app } from "../index";
import { env } from "../config/env";

app.listen(env.port, () => {
  console.log(`🚀 Server running on http://localhost:${env.port}`);
});
