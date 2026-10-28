
function ProductCard({ product, onDelete }) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(product.price)

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            {product.name}
          </h3>

          <span className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {product.category}
          </span>
        </div>

        <span className="text-2xl" aria-hidden="true">
          📦
        </span>
      </div>

      <p className="mt-4 min-h-10 text-sm text-slate-500">
        {product.description || 'No description provided.'}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-lg font-bold text-indigo-700">
            {formattedPrice}
          </p>

          <p
            className={`mt-1 text-sm ${
              product.stock === 0 ? 'text-red-600' : 'text-slate-500'
            }`}
          >
            Stock: {product.stock}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDelete(product.id)}
          aria-label={`Delete ${product.name}`}
          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default ProductCard

