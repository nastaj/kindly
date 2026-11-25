import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Kindly server is running' });
});

app.use('/api/books', bookRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
  }
}

startServer();
