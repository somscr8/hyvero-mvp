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
        await this.users.add({
          email: 'admin@hyvero.ai',
          password: 'admin123',
          role: 'admin',
          name: 'Admin User',
          createdAt: new Date(),
          status: 'active'
        });
      }
    });
  }
}

export const db = new HyveroDB();