import mongoose from 'mongoose';
import Transaction from '@/models/transactions'; // Adjust the path as needed

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

// Generate recent dates
function getRecentDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
}

// Sample transaction data
const sampleTransactions = [
  { amount: 100, date: getRecentDate(1), description: 'Groceries', category: 'Food' },
  { amount: 200, date: getRecentDate(2), description: 'Rent', category: 'Rent' },
  { amount: 50, date: getRecentDate(3), description: 'Utilities', category: 'Utilities' },
  { amount: 150, date: getRecentDate(4), description: 'Entertainment', category: 'Entertainment' },
  { amount: 75, date: getRecentDate(5), description: 'Transport', category: 'Transport' },
  { amount: 300, date: getRecentDate(6), description: 'Rent', category: 'Rent' },
  { amount: 25, date: getRecentDate(7), description: 'Groceries', category: 'Food' },
  { amount: 100, date: getRecentDate(8), description: 'Utilities', category: 'Utilities' },
  { amount: 50, date: getRecentDate(9), description: 'Transport', category: 'Transport' },
  { amount: 200, date: getRecentDate(10), description: 'Entertainment', category: 'Entertainment' },
  { amount: 150, date: getRecentDate(11), description: 'Groceries', category: 'Food' },
  { amount: 120, date: getRecentDate(12), description: 'Transport', category: 'Transport' },
  { amount: 80, date: getRecentDate(13), description: 'Utilities', category: 'Utilities' },
  { amount: 250, date: getRecentDate(14), description: 'Rent', category: 'Rent' },
  { amount: 90, date: getRecentDate(15), description: 'Entertainment', category: 'Entertainment' },
  { amount: 60, date: getRecentDate(16), description: 'Groceries', category: 'Food' },
  { amount: 180, date: getRecentDate(17), description: 'Transport', category: 'Transport' },
  { amount: 70, date: getRecentDate(18), description: 'Utilities', category: 'Utilities' },
  { amount: 220, date: getRecentDate(19), description: 'Rent', category: 'Rent' },
  { amount: 110, date: getRecentDate(20), description: 'Entertainment', category: 'Entertainment' }
];

// Connect to MongoDB and insert data
async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Insert sample data
    await Transaction.insertMany(sampleTransactions);
    console.log('Sample data inserted successfully');

    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit with an error code
  }
}

// Run the script
seedDatabase();
