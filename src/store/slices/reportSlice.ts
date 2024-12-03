import { StateCreator } from 'zustand';
import { SalesReport } from '../../types';
import { reportService } from '../../services/reportService';
import toast from 'react-hot-toast';

export interface ReportState {
  reports: SalesReport[];
}

export interface ReportActions {
  loadReports: () => Promise<void>;
  addReport: (report: Omit<SalesReport, 'id'>) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
}

export type ReportSlice = ReportState & ReportActions;

export const createReportSlice: StateCreator<ReportSlice> = (set) => ({
  reports: [],
  
  loadReports: async () => {
    try {
      const reports = await reportService.getAll();
      set({ reports });
    } catch (error) {
      console.error('Error loading reports:', error);
      set({ reports: [] });
      toast.error('Error al cargar los reportes');
    }
  },
  
  addReport: async (report) => {
    try {
      const newReport = await reportService.add(report);
      set((state) => ({
        reports: [newReport, ...state.reports],
      }));
      toast.success('Reporte generado exitosamente');
    } catch (error) {
      console.error('Error adding report:', error);
      toast.error('Error al generar el reporte');
    }
  },
  
  deleteReport: async (id) => {
    try {
      await reportService.delete(id);
      set((state) => ({
        reports: state.reports.filter((r) => r.id !== id),
      }));
      toast.success('Reporte eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.error('Error al eliminar el reporte');
    }
  },
});