import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; 
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../DatabaseConfig/FirebaseConnect';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueId}${ext}`);
  },
});


const upload = multer({ storage });


export const config = {
  api: {
    bodyParser: false, 
  },
};


const multerMiddleware = upload.single('image');

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');  
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    
    await runMiddleware(req, res, multerMiddleware);

    const { title } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const imagePath = `/uploads/${req.file.filename}`;

   
    const docRef = await addDoc(collection(db, 'zia'), {
      title,
      imagePath, 
      createdAt: new Date().toISOString(),
    });

    
    res.status(200).json({ success: true, id: docRef.id, path: imagePath });
  } catch (e) {
    console.error('Error processing request:', e);
    res.status(500).json({ success: false, message: 'Error processing request' });
  }
}
