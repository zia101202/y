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


export default function handler(req, res) {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Something went wrong while uploading' });
    }

   
    const { title } = req.body;

   
    if (!title || !req.file) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
      
      const imagePath = `/uploads/${req.file.filename}`;

      
      const docRef = await addDoc(collection(db, 'zia'), {
        title,
        imagePath, 
        createdAt: new Date().toISOString(),
      });

      res.status(200).json({ success: true, id: docRef.id, path: imagePath });
    } catch (e) {
      console.error('Error adding document: ', e);
      res.status(500).json({ success: false, message: 'Error adding document' });
    }
  });
}
