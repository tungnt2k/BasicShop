const router = require('express').Router();

const sessionController = require('../controller/session.controller');

router.get('/', sessionController.sessions);

router.get('/:sessionId', sessionController.session);
    
router.post('/', sessionController.create);

module.exports = router;