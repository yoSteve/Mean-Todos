const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://steve:test@ds161580.mlab.com:61580/meantodos_stevey', ['todos']);

// Get all todos
router.get('/todos', function(req, res) {
    db.todos.find( (err, todos) => {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

// Get single todo
router.get('/todo/:id', (req, res) => {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, (err, todo) => {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

// Save todo
router.post('/todo', (req, res) => {
    const todo = req.body;
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        db.save(todo, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Update todo 
router.put('/todo/:id', (req, res) => {
    const todo = req.body;
    const updatedObj = {};

    if (todo.isCompleted) {
        updatedObj.isCompleted = todo.isCompleted;
    }
    if (todo.text) {
        updatedObj.text = todo.text;
    }
    if (!updatedObj) {
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updatedObj, {}, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Delete todo 
router.delete('/todo/:id', (req, res) => {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;