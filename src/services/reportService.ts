import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { SalesReport, Sale } from '../types';

const COLLECTION_NAME = 'reports';
const reportsRef = collection(db, COLLECTION_NAME);

// Helper function to convert dates in sales array
const convertSaleDates = (sales: Sale[]): Sale[] => {
  return sales.map(sale => ({
    ...sale,
    date: new Date(sale.date).toISOString()
  }));
};

// Helper function to prepare report data for Firestore
const prepareReportData = (report: Omit<SalesReport, 'id'>) => {
  return {
    date: Timestamp.fromDate(new Date(report.date)),
    totalAmount: Number(report.totalAmount),
    sales: convertSaleDates(report.sales),
    topProducts: report.topProducts.map(product => ({
      productId: product.productId,
      quantity: Number(product.quantity),
      totalSales: Number(product.totalSales)
    }))
  };
};

// Helper function to convert Firestore data to SalesReport
const convertFirestoreReport = (doc: any): SalesReport => {
  const data = doc.data();
  return {
    id: doc.id,
    date: data.date.toDate().toISOString(),
    totalAmount: Number(data.totalAmount),
    sales: data.sales.map((sale: any) => ({
      ...sale,
      totalPrice: Number(sale.totalPrice),
      quantity: Number(sale.quantity)
    })),
    topProducts: data.topProducts.map((product: any) => ({
      productId: product.productId,
      quantity: Number(product.quantity),
      totalSales: Number(product.totalSales)
    }))
  };
};

export const reportService = {
  async getAll(): Promise<SalesReport[]> {
    try {
      const q = query(reportsRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(convertFirestoreReport);
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  async add(report: Omit<SalesReport, 'id'>): Promise<SalesReport> {
    try {
      const reportData = prepareReportData(report);
      const docRef = await addDoc(reportsRef, reportData);
      
      return {
        id: docRef.id,
        date: report.date,
        totalAmount: report.totalAmount,
        sales: report.sales,
        topProducts: report.topProducts
      };
    } catch (error) {
      console.error('Error adding report:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting report:', error);
      throw error;
    }
  }
};