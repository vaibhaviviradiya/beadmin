var express = require('express');
var router = express.Router();
var multer = require('multer');
var admin_login = require('../controller/admin_con')
const { add_category, view_category } = require('../controller/category');
const { sub_category, view_subcategory } = require('../controller/subcategory');
const { add_product, view_product, view_one_product } = require('../controller/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

/* GET users listing. */
router.post('/admin_add', admin_login.create_admin );
router.post('/login', admin_login.admin_login);

router.post('/addcategory',upload.array('picture',15),add_category)
router.get('/dispcategory',view_category)

router.post('/addsubcategory/:id',upload.array('picture',15),sub_category)
router.get('/dispsubcat',view_subcategory)

router.post('/addproduct/:id',upload.array('picture',15),add_product)
router.get('/viewproduct',view_product)
router.get('/viewoneproduct/:id',view_one_product);

module.exports = router;
