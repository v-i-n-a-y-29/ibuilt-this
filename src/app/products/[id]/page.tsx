'use cache'
import getFeaturedProducts from "@/lib/products/product-select";
export const generateStaticParams = async () => {
  const products = await getFeaturedProducts(); // Fetch all products from the database
  return products.map((product) => ({
    id: product.id.toString(), // Ensure the ID is a string for URL parameters
  }));
}


export default async function Products({ params }: { params: Promise<{ id: string }> })  {
    const { id } = await params;
  return (
    <div >
      <h1>Products  {id}</h1>
    </div>
  );
}