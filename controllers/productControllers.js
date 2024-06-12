import productModel from '../models/productModel.js'

async function getProducts(req, res) {
  try {
    const products = await productModel.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Produkte' })
  }
}

import { cloudinary } from '../cloudinary/cloudinaryConfig.js'

const createProduct = async (req, res) => {
  // hole die Daten aus dem Request (Bild inklusive)
  const { name, description, price, image } = req.body

  // lade das Bild in Cloudinary hoch (cloudinary scheint eigene error handling zu haben)
  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: 'cloudimage',
      public_id: `${name}`,
      allowed_formats: [
        'jpg',
        'png',
        'jpeg',
        'gif',
        'svg',
        'webp',
        'jfif',
        'ico',
      ],
    },
    function (error, result) {
      if (error) throw error
    }
  )

  // du kannst das Bild in der Konsole ausgeben, um zu sehen, ob es funktioniert hat
  console.log(uploadedImage)

  // hole den `secure_url` aus dem `uploadedImage` Objekt.  Das ist der Pfad zum Bild in Cloudinary
  const cloudImg = uploadedImage.secure_url

  // hole den `public_id` aus dem `uploadedImage` Objekt.  Das brauchst du, um das Bild später zu löschen
  const cloudImgPub = uploadedImage.public_id
  // erstelle ein neues Produkt mit dem Bildpfad
  try {
    const product = new productModel({
      name,
      description,
      image: cloudImg, // hier wird das Bildpfad gespeichert
      imgpub: cloudImgPub, // hier wird das public_id gespeichert
    })
    await product.save()
    res.status(201).json({ message: 'Product erfolgreich gespeichert' })
  } catch (error) {
    res.status(500).json({ message: 'Fehler bei der Speicherung' })
  }
}

export { createProduct, getProducts }
