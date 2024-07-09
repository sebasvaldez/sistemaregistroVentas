import {ProductsContext} from '../contexts/ProductsContext'



export const ProductProvider = ({children}) => {
  return (
    <ProductsContext.Proider value={{}}>
        {children}
    </ProductsContext.Proider>
  )
}
