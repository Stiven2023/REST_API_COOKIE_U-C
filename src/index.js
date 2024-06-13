import app from './app.js';
import './database.js';
import cors from "cors";

app.use(cors({
  credentials: true,
}));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); 