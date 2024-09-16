import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../BarberGrid.css'; // Asegúrate de crear este archivo para los estilos de la grilla

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDu6dlt4b50lZj6VbOZqEqX7LMuRehVORc",
    authDomain: "prueba-app-21c6d.firebaseapp.com",
    projectId: "prueba-app-21c6d",
    storageBucket: "prueba-app-21c6d.appspot.com",
    messagingSenderId: "242770769405",
    appId: "1:242770769405:web:40ac388b9034a8f5325594"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BarberGrid = () => {
  const [barbers, setBarbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener datos de los barberos de Firestore
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "barberos"));
        const barbersList: any[] = [];
        querySnapshot.forEach((doc) => {
          barbersList.push({ id: doc.id, ...doc.data() });
        });
        setBarbers(barbersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching barbers data: ", error);
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  // Manejo de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  // Verificar si no se encontraron barberos
  if (barbers.length === 0) {
    return <div>No barbers found.</div>;
  }

  return (
    <div className="barber-grid-container">
      <h2>Barbers List</h2>
      <table className="barber-grid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialities</th>
            <th>Location</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {barbers.map((barber) => (
            <tr key={barber.id}>
              <td>{barber.nombre}</td>
              <td>
                {barber.specialities 
                  ? barber.specialities.join(', ') 
                  : "No specialities"}
              </td>
              <td>{barber.ubicacion_local || "No location"}</td>
              <td>{barber.role || "No role"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarberGrid;
