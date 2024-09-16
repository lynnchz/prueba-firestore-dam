import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

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

const Formulario = () => {
  // Estados para los datos del formulario
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('barbero'); // valor por defecto
  const [ubicacionLocal, setUbicacionLocal] = useState('');
  const [tipo, setTipo] = useState('barbero'); // Para seleccionar el tipo de dato a guardar

  // Función para guardar datos en Firebase
  const guardarDatos = async () => {
    try {
      if (tipo === 'barbero') {
        // Guardar barbero
        await addDoc(collection(db, "barberos"), {
          nombre,
          username,
          password, // Asegúrate de encriptar las contraseñas
          role,
          ubicacion_local: ubicacionLocal
        });
        console.log("Barbero agregado correctamente");
      } else if (tipo === 'servicio') {
        // Guardar servicio
        await addDoc(collection(db, "servicios"), {
          nombre,
          descripcion: ubicacionLocal, // Usamos 'ubicacionLocal' como 'descripcion' para el servicio
          duracion: parseInt(username), // Usamos 'username' para la duración del servicio
          precio: parseFloat(password) // Usamos 'password' como 'precio' para el servicio
        });
        console.log("Servicio agregado correctamente");
      } else if (tipo === 'cliente') {
        // Guardar cliente
        await addDoc(collection(db, "clientes"), {
          nombre,
          email: username, // Usamos 'username' como 'email'
          telefono: password // Usamos 'password' como 'telefono'
        });
        console.log("Cliente agregado correctamente");
      }
    } catch (e) {
      console.error("Error al agregar datos: ", e);
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    guardarDatos();
  };

  return (
    <div className="form-container">
      <h2>Formulario para agregar datos</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="tipo">Tipo de dato:</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-control">
            <option value="barbero">Barbero</option>
            <option value="servicio">Servicio</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            className="form-control"
            required 
          />
        </div>

        {tipo === 'barbero' && (
          <>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                id="username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="form-control"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input 
                type="password" 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="form-control"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Rol:</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
                <option value="barbero">Barbero</option>
                <option value="dueno">Dueño</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="ubicacionLocal">Ubicación del Local:</label>
              <input 
                type="text" 
                id="ubicacionLocal"
                value={ubicacionLocal} 
                onChange={(e) => setUbicacionLocal(e.target.value)} 
                className="form-control"
                required 
              />
            </div>
          </>
        )}

        {tipo === 'servicio' && (
          <>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <input 
                type="text" 
                id="descripcion"
                value={ubicacionLocal} // Usando ubicacionLocal como descripción
                onChange={(e) => setUbicacionLocal(e.target.value)} 
                className="form-control"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="duracion">Duración (minutos):</label>
              <input 
                type="number" 
                id="duracion"
                value={username} // Usando username como duración
                onChange={(e) => setUsername(e.target.value)} 
                className="form-control"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio:</label>
              <input 
                type="number" 
                id="precio"
                step="0.01"
                value={password} // Usando password como precio
                onChange={(e) => setPassword(e.target.value)} 
                className="form-control"
                required 
              />
            </div>
          </>
        )}

        {tipo === 'cliente' && (
          <>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email"
                value={username} // Usando username como email
                onChange={(e) => setUsername(e.target.value)} 
                className="form-control"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input 
                type="text" 
                id="telefono"
                value={password} // Usando password como teléfono
                onChange={(e) => setPassword(e.target.value)} 
                className="form-control"
                required 
              />
            </div>
          </>
        )}

        <button type="submit" className="btn-submit">Guardar</button>
      </form>
    </div>
  );
}

export default Formulario;
