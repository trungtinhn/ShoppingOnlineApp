const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Adjust the path as needed

const orderController = {
    createOrder : async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            const savedOrder = await newOrder.save();
            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getAllOrders : async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOrderById : async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOrdersByUserId : async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.params.userId });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOrdersByUserIdAndStatus : async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.params.userId, status: req.params.status });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateOrderById : async (req, res) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateOrderStatus : async (req, res) => {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }
    
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteOrderById : async (req, res) => {
        try {
            const deletedOrder = await Order.findByIdAndDelete(req.params.id);
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json({ message: 'Order deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = orderController