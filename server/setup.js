import pool from './db.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupDatabase() {
  try {
    console.log('📦 Setting up database...');
    
    // Read and execute schema
    const schema = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    
    console.log('✅ Database setup completed successfully!');
    console.log('📝 Sample users created:');
    console.log('   - john@company.com (Employee)');
    console.log('   - jane@company.com (HR)');
    console.log('   - admin@company.com (Admin)');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Database setup failed:', err);
    process.exit(1);
  }
}

setupDatabase();
