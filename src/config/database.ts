import { Pool } from 'pg';

// 從環境變數獲取資料庫連接資訊
const { DATABASE_URL } = process.env;

// 檢查必要的環境變數
if (!DATABASE_URL) {
  throw new Error('Missing DATABASE_URL in environment variables');
}

// 建立連接池
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // 添加連接超時設置
  connectionTimeoutMillis: 10000, // 10 秒
  // 添加查詢超時設置
  query_timeout: 10000, // 10 秒
  // 添加閒置超時設置
  idle_in_transaction_session_timeout: 10000, // 10 秒
});

// 測試資料庫連接
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  release();
});

// 監聽連接錯誤
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// 監聽連接事件
pool.on('connect', () => {
  console.log('New client connected to the database');
});

// 監聽獲取事件
pool.on('acquire', () => {
  console.log('Client acquired from the pool');
});

export default pool; 