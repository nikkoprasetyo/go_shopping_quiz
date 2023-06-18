async function addToCart(req, res) {
  try {
    const { CartId } = req.body;
    const findProduct = await req.context.models.products.findOne({
      where: { prodid: CartId },
    });
    if (!findProduct) {
      throw { name: "No Product with this id" };
    }
    const { stock } = findProduct;
    let decreaseStock = stock - 1;
    if (stock <= 0) {
      throw { name: "Stok sudah habis" };
    } else {
      const cart = await req.context.models.cart.create({
        CartId: CartId,
      });
      const updateProduct = await req.context.models.products.update(
        {
          stock: decreaseStock,
        },
        {
          where: {
            prodid: CartId,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.send(error.name);
  }
}

export default { addToCart };
