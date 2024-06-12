async function createProduct(req, res) {
  const { name, description, image } = req.body
  try {
    const product = new productModel({
      name,
      description,
    })
    await product.save()
    res.status(201).json({ message: 'Product erfolgreich gespeichert' })
  } catch (error) {
    res.status(500).json({ message: 'Fehler bei der Speicherung' })
  }
}

export default createProduct
