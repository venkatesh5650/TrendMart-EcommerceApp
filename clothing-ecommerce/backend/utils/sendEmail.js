const nodemailer = require("nodemailer");

/**
 * Utility function for sending order confirmation emails.
 * Keeps email-related logic in a single, reusable place.
 */
const sendOrderEmail = async (order, user) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials not configured. Skipping email sending.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name} (Size: ${item.size}) x ${item.qty} - ₹${item.price}</li>`
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - #${order._id}`,
    html: `
      <h1>Thank you for your order, ${user.name}!</h1>
      <p>Your order has been placed successfully.</p>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
      <h3>Items:</h3>
      <ul>${itemsHtml}</ul>
      <h2>Total: ₹${order.totalPrice}</h2>
      <p>We appreciate your purchase and hope you enjoy your new clothes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderEmail };
