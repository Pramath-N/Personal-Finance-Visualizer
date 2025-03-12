export interface Budget {
    _id?: string; // Optional for new budgets (MongoDB will generate this)
    category: string;
    budget: number;
    month: string; // Format: "YYYY-MM"
}