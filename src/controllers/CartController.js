import Cart from "../models/Cart";
import Product from "../models/ProductsModel";
import User from "../models/UsersModel";

export const findAllCartUser = async (req, res) => {
  try {
    const carts = await Cart.findOne({ orderedBy: req.params.id })
      .populate("orderProducts.product")
      .exec();
    return res.json(carts);
  } catch (error) {
    return res.json({ message: `BE : ${error.message}` });
  }
};

// export const addToCart = async (req, res) => {
//    function financial(x, y) {
//       return (x * (1 - y / 100)).toFixed(2);
//    };
//    try {
//       const { orderProducts, userId } = req.body;

//       const existCartUser = await Cart.findOne({ userId: userId }).exec();
//       const { price, discount, stock } = await Product.findOne({ _id: orderProducts.product }).exec();
//       console.log(price, discount, stock);
//       if (existCartUser) {
//          let itemIndex = existCartUser.products.findIndex((p) => p.product == orderProducts.product);
//          if (itemIndex > -1) {
//             let productItem = existCartUser.products[itemIndex];
//             productItem.quantity += orderProducts.quantity;
//             productItem.totalPrice += discount ? +financial(price, discount) * orderProducts.quantity : price * orderProducts.quantity;
//             if (productItem.quantity >= stock) {
//                productItem.quantity = stock;
//                productItem.totalPrice = discount ? +financial(price, discount) * stock : price * stock;
//             };
//             existCartUser.products[itemIndex] = productItem;
//          }
//          else {
//             orderProducts.quantity = orderProducts.quantity < stock ? orderProducts.quantity : stock;
//             existCartUser.products.push({
//                product: orderProducts.product,
//                quantity: orderProducts.quantity,
//                totalPrice: discount ? +financial(price, discount) * orderProducts.quantity : price * orderProducts.quantity
//             })
//          }
//          let newGrandTotal = 0;
//          existCartUser.products.forEach(product => {
//             newGrandTotal += product.totalPrice
//          });
//          const cart = await Cart.findOneAndUpdate({ _id: existCartUser._id }, {
//             products: existCartUser.products,
//             cartTotal: newGrandTotal,
//             userId
//          }, { new: true }).populate("products.product").exec();
//          res.status(200).json(cart);
//       }
//       else {
//          orderProducts.quantity = orderProducts.quantity < stock ? orderProducts.quantity : stock;
//          const cart = await new Cart({
//             products: [
//                {
//                   product: orderProducts.product,
//                   quantity: orderProducts.quantity,
//                   totalPrice: discount ? (+financial(price, discount) * orderProducts.quantity) : (price * orderProducts.quantity),
//                }
//             ],
//             cartTotal: discount ? +financial(price, discount) * orderProducts.quantity : price * orderProducts.quantity,
//             userId
//          }).save();
//          const cartNew = await cart.pdopulate("products.product");
//          res.status(200).json(cartNew);
//       }

//    } catch (error) {
//       res.status(400).json({ message: `BE : ${error.message}` });
//    }
// };
export const addToCart = async (req, res) => {
  try {
    const cart = await new Cart(req.body).save();

    res.json({
      message: "BE: Add to cart success",
      cart,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const updateCart = async (req, res) => {
  try {
    function financial(x, y) {
      return (x * (1 - y / 100)).toFixed(2);
    }
    const { actionId } = req.params;
    const { product, id } = req.body;
    const existCart = await Cart.findOne({ _id: id }).exec();
    const { price, discount, stock } = await Product.findOne({
      _id: product,
    }).exec();
    let itemIndex = existCart.products.findIndex((p) => p.product == product);
    const userId = existCart.userId;
    let newGrandTotal = 0;
    if (actionId == "remove") {
      existCart.products = existCart.products.filter(
        (item) => item.product != product
      );
    } else if (actionId == "clear") {
      existCart.products = [];
    } else if (actionId == "increase") {
      existCart.products[itemIndex].quantity++;
      existCart.products[itemIndex].totalPrice += discount
        ? +financial(price, discount)
        : price;
    } else if (actionId == "decrease") {
      existCart.products[itemIndex].quantity--;
      existCart.products[itemIndex].totalPrice -= discount
        ? +financial(price, discount)
        : price;
    }
    existCart.products.forEach((product) => {
      newGrandTotal += product.totalPrice;
    });
    const cart = await Cart.findOneAndUpdate(
      { _id: existCart._id },
      {
        products: existCart.products,
        grandTotal: newGrandTotal,
        userId,
      },
      { new: true }
    )
      .populate("products.product")
      .exec();
    return res.json(cart);
  } catch (error) {
    res.json({ message: error.message });
  }
};
