export interface Transaction {
    _id: string;
    amount: number;
    date: Date;
    description: string;
    category: string;
}
export interface TransactionData {
    amount: number;
    date: string;
    description: string;
    category: string;
}