
import { useState } from 'react'

const initialForm = {
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
}

function ProductForm({ onAddProduct }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const price = Number(form.price)
    const stock = Number(form.stock)

    if (
      !form.name.trim() ||
      !form.category ||
      form.price === '' ||
      form.stock === ''
    ) {
      setError('Please fill in all required fields.')
      return
    }

    if (!Number.isFinite(price) || price <= 0) {
      setError('Price must be greater than zero.')
      return
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError('Stock must be zero or a positive whole number.')
      return
    }

    onAddProduct({
      id: `${Date.now()}-${Math.random()}`,
      name: form.name.trim(),
      category: form.category,
      price,
      stock,
      description: form.description.trim(),
    })

    setForm(initialForm)
    setError('')
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-bold text-slate-800">
        Create Product
      </h2>

      <p className="mb-5 text-sm text-slate-500">
        Enter the product information below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Product Name *
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            maxLength={100}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Home & Living">Home &amp; Living</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-medium"
            >
              Price (₹) *
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="999"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="mb-1 block text-sm font-medium"
            >
              Stock *
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              placeholder="10"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={3}
            maxLength={500}
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          + Add Product
        </button>
      </form>
    </section>
  )
}

export default ProductForm
