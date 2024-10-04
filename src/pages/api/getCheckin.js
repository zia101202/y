

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../DatabaseConfig/FirebaseConnect';  

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const usersCollectionRef = collection(db, 'zia');  
      const usersSnapshot = await getDocs(usersCollectionRef); 
      const checkinData = usersSnapshot.docs.map(doc => ({
        id: doc.id,  
        ...doc.data()  
      }));

      
      res.status(200).json({ success: true, data: checkinData });
    } catch (e) {
      console.error('Error fetching check-in data:', e);
      res.status(500).json({ success: false, message: 'Error fetching data' });
    }
  } else {
    
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}



