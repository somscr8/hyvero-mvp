import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  email: string;
  password: string;
  role: 'admin' | 'executive';
  name: string;
  createdAt: Date;
  status: 'active' | 'inactive';
}

export interface Template {
  id?: number;
  name: string;
  description: string;
  sections: TemplateSection[];
  createdBy: number;
  createdAt: Date;
  status: 'active' | 'draft';
}

export interface TemplateSection {
  id: string;
  title: string;
  fields: TemplateField[];
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'file';
  required: boolean;
  options?: string[];
}

export interface Report {
  id?: number;
  templateId: number;
  name: string;
  data: Record<string, any>;
  progress: number;
  createdBy: number;
  createdAt: Date;
  status: 'draft' | 'completed';
}

export interface UploadedFile {
  id?: number;
  name: string;
  size: number;
  type: string;
  data: ArrayBuffer;
  uploadedBy: number;
  uploadedAt: Date;
  mappings?: Record<string, string>;
}

export class HyveroDB extends Dexie {
  users!: Table<User>;
  templates!: Table<Template>;
  reports!: Table<Report>;
  files!: Table<UploadedFile>;

  constructor() {
    super('hyveroDB');
    this.version(1).stores({
      users: '++id, email, role, status',
      templates: '++id, createdBy, status',
      reports: '++id, templateId, createdBy, status',
      files: '++id, uploadedBy, uploadedAt'
    });

    // Add default admin user if none exists
    this.on('ready', async () => {
      const userCount = await this.users.count();
      if (userCount === 0) {
        const adminId = await this.users.add({
          email: 'admin@hyvero.ai',
          password: 'admin123',
          role: 'admin',
          name: 'Admin User',
          createdAt: new Date(),
          status: 'active'
        });

        console.log(`Admin user created with ID: ${adminId}`);
      }
    });
  }

  // Method to clear the users table
  clearUsers = async () => {
    await this.users.clear();
    console.log('Users table cleared');
  };

  // Method to clear the templates table
  clearTemplates = async () => {
    await this.templates.clear();
    console.log('Templates table cleared');
  };

  // Method to clear the reports table
  clearReports = async () => {
    await this.reports.clear();
    console.log('Reports table cleared');
  };

  // Method to clear the files table
  clearFiles = async () => {
    await this.files.clear();
    console.log('Files table cleared');
  };
}

export const db = new HyveroDB();
