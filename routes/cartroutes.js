const { Router } = require('express');
const cartcontroller = require('../controllers/cartcontrollers');
const router = Router();
const { auth } = require('../auth'); 

router.get('/:id', auth, cartcontroller.get_cart_items);
router.post('/:id', auth, cartcontroller.add_cart_item);
router.put('/:id', auth, cartcontroller.update_cart_item);
router.delete('/:userId/:itemId', auth, cartcontroller.delete_item);

module.exports = router;