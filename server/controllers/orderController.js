async function createOrder(req, res) {
  try {
    const cart = await req.context.models.cart.findAll({
      include: [
        {
          models: req.context.models.itemproducts,
          as: "itemproducts",
          include: [
            {
              models: req.context.models.products,
              as: "products",
            },
          ],
        },
      ],
    });
    const { CartId, itemproducts } = cart;
    const { products } = itemproducts;
    let total = 0;
    products.forEach((e) => {
      total += e.price;
    });
    const makeOrder = await req.context.models.orders.create({
      totalPrice: total,
      status: "OPEN",
    });
    const moveToOrderLineItem = await req.context.models.orderlineitems.create({
      cartId: CartId,
    });
    const deleteCart = await req.context.models.cart.destroy({
      where: {},
    });
  } catch (error) {
    res.send(error);
  }
}

async function closeOrder(req, res) {
  try {
    const toCloseOrder = await req.context.models.orders.update(
      {
        status: "CLOSED",
      },
      { where: {} }
    );
  } catch (error) {
    res.send(error);
  }
}

async function cancelOrder(req, res) {
  try {
    const cancel = await req.context.models.orders.update(
      {
        status: "CANCELLED",
      },
      { where: {} }
    );
    const renewStock = await req.context.models.products.update(
      { stocks: +1 },
      { where: {} }
    );
  } catch (error) {
    res.send(error);
  }
}
export default { createOrder, closeOrder, cancelOrder };
