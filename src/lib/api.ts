import { db, User, Template, Report, UploadedFile } from './db';

// User API
export const userApi = {
  async login(email: string, password: string) {
    const user = await db.users.where('email').equals(email).first();
    if (user && user.password === password && user.status === 'active') {
      return user;
    }
    throw new Error('Invalid credentials');
  },

  async createUser(userData: Omit<User, 'id' | 'createdAt'>) {
    const exists = await db.users.where('email').equals(userData.email).first();
    if (exists) throw new Error('Email already exists');
    
    return db.users.add({
      ...userData,
      createdAt: new Date()
    });
  },

  async getUsers() {
    return db.users.toArray();
  },

  async updateUser(id: number, data: Partial<User>) {
    return db.users.update(id, data);
  }
};

// Template API
export const templateApi = {
  async createTemplate(template: Omit<Template, 'id' | 'createdAt'>) {
    return db.templates.add({
      ...template,
      createdAt: new Date()
    });
  },

  async getTemplates() {
    return db.templates.toArray();
  },

  async getTemplate(id: number) {
    return db.templates.get(id);
  },

  async updateTemplate(id: number, data: Partial<Template>) {
    return db.templates.update(id, data);
  }
};

// Report API
export const reportApi = {
  async createReport(report: Omit<Report, 'id' | 'createdAt'>) {
    return db.reports.add({
      ...report,
      createdAt: new Date()
    });
  },

  async getReports() {
    return db.reports.toArray();
  },

  async getReport(id: number) {
    return db.reports.get(id);
  },

  async updateReport(id: number, data: Partial<Report>) {
    return db.reports.update(id, data);
  },

  async getReportStats() {
    const reports = await db.reports.toArray();
    const total = reports.length;
    const completed = reports.filter(r => r.status === 'completed').length;
    const inProgress = total - completed;
    const averageProgress = reports.reduce((acc, r) => acc + r.progress, 0) / total;

    return { total, completed, inProgress, averageProgress };
  }
};

// File API
export const fileApi = {
  async uploadFile(file: Omit<UploadedFile, 'id' | 'uploadedAt'>) {
    return db.files.add({
      ...file,
      uploadedAt: new Date()
    });
  },

  async getFiles() {
    return db.files.toArray();
  },

  async getFile(id: number) {
    return db.files.get(id);
  },

  async deleteFile(id: number) {
    return db.files.delete(id);
  },

  async updateFileMappings(id: number, mappings: Record<string, string>) {
    return db.files.update(id, { mappings });
  }
};

// Dashboard API
export const dashboardApi = {
  async getStats() {
    const [users, templates, files, reports] = await Promise.all([
      db.users.count(),
      db.templates.count(),
      db.files.count(),
      reportApi.getReportStats()
    ]);

    return {
      users,
      templates,
      files,
      reports
    };
  }
};