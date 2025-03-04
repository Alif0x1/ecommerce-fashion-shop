import { getCategory } from '@/actions/get-category'
import { getColors } from '@/actions/get-colors'
import { getProducts } from '@/actions/get-products'
import { getSizes } from '@/actions/get-sizes'
import { Billboard } from '@/components/Billboard'
import { Container } from '@/components/ui/Container'
import NoResults from '@/components/ui/NoResults'
import ProductCard from '@/components/ui/product-card'
import { Filter } from './components/filter'

import React from 'react'
import { MobileFilters } from './components/mobile-filters'




interface CategoryPageProps {
  params: {
    categoryId: string
  }
  searchParams: {
    colourId: string
    sizeId: string
  }


}





const CategoryPage: React.FC<CategoryPageProps> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const produts = await getProducts({
    categoryId: params.categoryId,
    colourId: searchParams.colourId,
    sizeId: searchParams.sizeId,
  })

  const sizes = await getSizes()
  const colors = await getColors()
  const categorie = await getCategory(params.categoryId)






  return (
    <div className='bg-white'>
      <Container>
        <Billboard data={categorie.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 grid-cols-2 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />

            <div className='hidden lg:block'>
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colourId" name="Colors" data={colors} />
            </div>
            <div className='mt-6 lg:col-span-4 lg:mt-8'>
              {produts.length === 0 && <NoResults />}

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {produts.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>

  )
}

export default CategoryPage
