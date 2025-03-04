/* eslint-disable @typescript-eslint/ban-ts-comment */

import { getBillboards } from "@/actions/get-billboard";
import { getProducts } from "@/actions/get-products";
import { Billboard } from "@/components/Billboard";
import { ProductList } from "@/components/product-list";
import { Container } from "@/components/ui/Container";

export const revalidate = 0;

/**
 * HomePage component fetches and displays a billboard.
 *
 * This component asynchronously fetches billboard data using a predefined
 * billboard ID and renders it inside a Container component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
export default async function HomePage() {
  const billboardId = '600f3fb8-efce-4e88-9ded-18917c4ca89e';
  const billboard = await getBillboards(billboardId);
  const data = await getProducts({isFeatured: true});

  

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {/* @ts-expect-error */}
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 pb-4">
        <ProductList title="Featured Products" items={data} />
      </div>


    </Container>
  );
}
