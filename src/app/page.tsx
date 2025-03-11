import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center flex-1 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Personal Finance Visualizer</h1>
      <p className="text-lg mb-8">
        Track and visualize your personal finances with ease.
      </p>
      <div className='flex flex-col gap-4'>
        <Link
          href="/transactions"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
        >
          Go to Transactions
        </Link>
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}