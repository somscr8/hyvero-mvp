import Dexie from 'dexie';

// Define a new Dexie database
const db = new Dexie('TemplateDB');

// Define the schema for Templates
db.version(1).stores({
  templates: '++id, type, data, status, createdById, createdAt, updatedAt',
  // You might have a User table if needed, or handle users in another way.
  users: '++id, name, email', 
});

// Create a new Template in the Dexie database
export const createTemplate = async (templateData) => {
  try {
    // Ensure createdById is set before creating a template
    if (!templateData.createdById) {
      throw new Error('User ID is required to create a template.');
    }

    // Add template data to the templates table
    const template = await db.templates.add({
      ...templateData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return template;
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
};

// Get all templates of a specific type (or all templates)
export const getTemplates = async (type = null) => {
  try {
    // If a type is provided, filter by type; otherwise, return all templates
    const templates = type
      ? await db.templates.where('type').equals(type).toArray()
      : await db.templates.toArray();
    return templates;
  } catch (error) {
    console.error('Error retrieving templates:', error);
    throw error;
  }
};

// Update an existing template by its ID
export const updateTemplate = async (templateId, updatedData) => {
  try {
    // Check if the template exists
    const template = await db.templates.get(templateId);
    if (!template) {
      throw new Error('Template not found.');
    }

    // Update template data
    await db.templates.update(templateId, {
      ...updatedData,
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error updating template:', error);
    throw error;
  }
};

// Delete a template by its ID
export const deleteTemplate = async (templateId) => {
  try {
    const deletedCount = await db.templates.delete(templateId);
    if (deletedCount === 0) {
      throw new Error('Template not found or already deleted.');
    }
    return true;
  } catch (error) {
    console.error('Error deleting template:', error);
    throw error;
  }
};

// Optional: Function to initialize templates with some dummy data (for testing)
export const initializeTemplates = async () => {
  try {
    const templates = await db.templates.toArray();
    if (templates.length === 0) {
      await db.templates.bulkAdd([
        {
          type: 'associated-entities',
          data: { value1: 'Some Data' },
          status: 'active',
          createdById: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'reporting-entity',
          data: { value2: 'More Data' },
          status: 'active',
          createdById: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  } catch (error) {
    console.error('Error initializing templates:', error);
  }
};

// Optionally, expose the Dexie db instance itself
export default db;
