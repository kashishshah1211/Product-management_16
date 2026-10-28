
import { useState } from 'react'
import ProductForm from './ProductForm.jsx'
import ProductList from './ProductList.jsx'

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 2499,
      stock: 10,
      description: 'Wireless headphones with high-quality sound.',
    },
    {
      id: 2,
      name: 'Classic Backpack',
      category: 'Accessories',
      price: 1499,
      stock: 15,
      description: 'A stylish backpack for everyday use.',
    },
  ])

  const [search, setSearch] = useState('')

  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev])
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const filteredProducts = products.filter((product) => {
    const term = search.trim().toLowerCase()

    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    )
  })

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  )

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  )

  const formattedValue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(inventoryValue)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Product Workspace
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Product Management
            </h1>
          </div>

          <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            {products.length} Products
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {products.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Stock</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalStock}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Inventory Value</p>
            <p className="mt-2 text-2xl font-bold text-indigo-700">
              {formattedValue}
            </p>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <ProductForm onAddProduct={addProduct} />

          <div className="min-w-0">
            <div className="mb-5">
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Search Products
              </label>

              <input
                id="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or category..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <ProductList
              products={filteredProducts}
              onDelete={deleteProduct}
            />
          </div>
        </div>
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
        Product Management System | React + Tailwind CSS
      </footer>
    </div>
  )
}

export default App
