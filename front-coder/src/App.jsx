import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios("http://localhost:8080/api/products/list")
      .then(res => {
        console.log("DEBUG: Respuesta del backend:", res.data);

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("La respuesta del servidor no contiene un array válido de productos.");
          setProducts([]);
        }
      })
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setProducts([]);
      });
  }, []);

return (
  <section className='flex flex-wrap min-h-screen justify-evenly bg-blue-100 p-4'>
    {Array.isArray(products) && products.length > 0 ? (
      products.map(each => (
        <article key={each._id} className='bg-white shadow-md rounded m-2 p-3 w-72'>
          <h3 className='text-lg font-semibold mb-2'>{each.title}</h3>
          <img src={each.image} alt={each.title} className='w-full h-40 object-cover mb-2' />
          <p className='text-gray-700'>Precio: ${each.price}</p>
        </article>
      ))
    ) : (
      <p className='text-gray-500'>Cargando productos...</p>
    )}
  </section>
);

}

export default App;