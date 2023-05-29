const fctOrderController = require ('../controllers/fctOrderController');
const {Router} = require('express');
const router = Router();
const ethers = require('ethers');

// Import your contract ABI and contract address
const trackingABI = require('../smart contracts/Context/Tracking.json').abi;
const contractAddress = '0x4f3F1E984170bcd70691a372005aEF02056d4bBD';
router.post('/createFctOrder', fctOrderController.createFctOrder);
router.get('/findFctOrderById/:id',fctOrderController.findFctOrderById);
router.delete('/deleteFctOrder/:id',fctOrderController.deleteFctOrder);
router.post('/createShipment', async (req, res) => {
    try {
      // Get the necessary request parameters
      const { receiver, pickupTime, distance, price } = req.body;
  
      // Connect to the Ethereum network
      const provider = new ethers.providers.JsonRpcProvider('vPL-HfVoi5So7hoYMIs_gA2T5mKd5sWW');
      const signer = provider.getSigner();
  
      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, trackingABI, signer);
  
      // Call the createShipment function
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
  
      // Wait for the transaction to be mined
      await createItem.wait();
  
      res.json({ success: true, message: 'Shipment created successfully' });
    } catch (error) {
      console.log('Error creating shipment:', error);
      res.status(500).json({ success: false, message: 'Failed to create shipment' });
    }
  });

module.exports = router ;