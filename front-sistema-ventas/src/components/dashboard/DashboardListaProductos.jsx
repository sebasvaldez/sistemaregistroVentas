import { useState, useEffect } from "react"
import {getProductsRequest} from "../../config/axiosConnection.js"
import {TableProducts} from "./tables/TableProducts.jsx"

export const DashboardListaProductos = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () =>{
      const {data} = await getProductsRequest();
      setProducts(data);
      console.log(data)
    }
    getProducts();
  }, []);

  return (
    <div>{<TableProducts products = {products}/>}</div>
  )
}
