
import ProductCard from './ProductCard.jsx'

function ProductList({ products, onDelete }) {
  return (
    <section>
      <h2 className="mb-1 text-xl font-bold text-slate-800">
        Product Inventory
      </h2>

      <p className="mb-5 text-sm text-slate-500">
        All products added to your inventory.
      </p>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-700">
            No products found
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Add a product using the form.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList
