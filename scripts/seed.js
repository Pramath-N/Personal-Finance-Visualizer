import mongoose from 'mongoose';
import Transaction from '@/models/transactions'; // Adjust the path to your Transaction model

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

// Function to generate a random date within a range
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Sample transaction data for January to March 2025 (all amounts are positive)
const sampleTransactions = [
  // January 2025
  { amount: 150, date: new Date('2025-01-05'), description: 'Groceries', category: 'Food' },
  { amount: 1200, date: new Date('2025-01-20'), description: 'Rent', category: 'Rent' },
  { amount: 200, date: new Date('2025-01-25'), description: 'Utilities', category: 'Utilities' },

  // February 2025
  { amount: 75, date: new Date('2025-02-10'), description: 'Dinner Out', category: 'Food' },
  { amount: 50, date: new Date('2025-02-20'), description: 'Gym Membership', category: 'Other' },
  { amount: 60, date: new Date('2025-02-22'), description: 'Internet Bill', category: 'Utilities' },

  // March 2025
  { amount: 500, date: new Date('2025-03-15'), description: 'Vacation Savings', category: 'Other' },
  { amount: 300, date: new Date('2025-03-10'), description: 'Car Repair', category: 'Transport' },
  { amount: 400, date: new Date('2025-03-20'), description: 'Holiday Shopping', category: 'Entertainment' },
  { amount: 100, date: new Date('2025-03-25'), description: 'Charity Donation', category: 'Other' },
  { amount: 1000, date: new Date('2025-03-30'), description: 'Investment Deposit', category: 'Other' },

  // Random transactions for variety
  { amount: 120, date: getRandomDate(new Date('2025-01-01'), new Date('2025-01-31')), description: 'Transport', category: 'Transport' },
  { amount: 80, date: getRandomDate(new Date('2025-02-01'), new Date('2025-02-28')), description: 'Utilities', category: 'Utilities' },
  { amount: 250, date: getRandomDate(new Date('2025-03-01'), new Date('2025-03-31')), description: 'Rent', category: 'Rent' },
  { amount: 90, date: getRandomDate(new Date('2025-01-01'), new Date('2025-03-31')), description: 'Entertainment', category: 'Entertainment' },
  { amount: 60, date: getRandomDate(new Date('2025-02-01'), new Date('2025-03-31')), description: 'Groceries', category: 'Food' },
];

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete all existing transactions
    await Transaction.deleteMany({});
    console.log('Deleted all existing transactions');

    // Insert sample data
    await Transaction.insertMany(sampleTransactions);
    console.log('Inserted 20 sample transactions');

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