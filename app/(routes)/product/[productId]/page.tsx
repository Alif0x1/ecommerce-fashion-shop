import { getProduct } from '@/actions/get-product'
import {getProducts} from '@/actions/get-products'
import Gallary from '@/components/Gallary'
import { Info } from '@/components/info'
import { ProductList } from '@/components/product-list'

import { Container } from '@/components/ui/Container'

import React from 'react'



interface ProductPageProps {
    params:{
        productId: string
    }
}

const  ProductPage: React.FC<ProductPageProps> = async props => {
  const params = await props.params;

  const product = await  getProduct(params.productId)

  const suggestedProdcuts = await getProducts({
      categoryId: product?.category?.id
  })


  if(!product){
      return null
  }





  return (
  <div className='bg-white'>
    <Container>
      <div className='px-4 py-10 sm:px-6 lg:px-8'>
        <div className=' lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>

          {/* { Gallary } */}
          <Gallary images={product.images}/>
          <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
            {/* { Info } */}
           <Info data={product}/>
          </div>
        </div>
        <hr className='my-10'/>
        <ProductList  title='Related Items' items={suggestedProdcuts}/>
      </div>
    </Container>
  </div>
)
}

export default  ProductPage
