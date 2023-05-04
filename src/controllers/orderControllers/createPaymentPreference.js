const mercadopago = require('mercadopago');
const { Order, OrderItem, Product } = require('../../db');

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const createPaymentPreference = async (orderId) => {
  console.log("orderId", orderId)
  const order = await Order.findByPk(orderId, {
    include: [{
      model: OrderItem,
      as: 'items',
      include: {
        model: Product,
        as: 'product',
      }
    }],
  });
  console.log(order)
  if (!order) {
    throw new Error('Pedido no encontrado');
  }

  const items = order.items.map((item) => ({
    title: item.product.name,
    unit_price: item.product.price,
    quantity: item.quantity,
  }));

  const preference = {
    items,
    external_reference: `${order.id}`,
    back_urls: {
      success: 'https://backpf-production-18e8.up.railway.app/purchase/approved',
      failure: 'https://backpf-production-18e8.up.railway.app/purchase/rejected',
      pending: 'https://backpf-production-18e8.up.railway.app/purchase/pending',
    },
    notification_url: 'https://backpf-production-18e8.up.railway.app/payment/handle-payment-notification',
  };
  

  const response = await mercadopago.preferences.create(preference);
  console.log("Preferencia de pago creada:", response.body);

  return response.body.init_point;
};

module.exports = { createPaymentPreference };