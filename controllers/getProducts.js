async function getProducts(req, res) {
  try {
    const products = await productModel.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Produkte' })
  }
}

export default getProducts
