// // import orderModel from "../models/orderModel.js"

// export const getOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ buyer: req.user._id }).populate("products").populate("buyer", "name")
//         res.json(orders)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: "Error While getting Orders",
//             error
//         })
//     }
// }