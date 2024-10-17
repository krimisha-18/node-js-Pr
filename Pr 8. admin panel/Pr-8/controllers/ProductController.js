const categoryModle = require('../models/CatagoryModle')
const subcategoryModle = require('../models/SubCategoryModle')
const exsubcategoryModle = require('../models/ExsubcategoryModle')
const productModle = require('../models/ProductModle')
const path = require('path')
const fs = require('fs')
const ViewProductpage = async (req, res) => {
    try {
        let product = await productModle.find({}).populate("exsubcategoryId").populate("subcategoryId").populate("categoryId");
        // console.log(product);

        return res.render('product/view_product', {
            product: product
        })

    } catch (error) {
        console.log(error);
        return false;
    }

}
const AddProductpage = async (req, res) => {
    try {
        const category = await categoryModle.find({})
        const subcategory = await subcategoryModle.find({})
        const exsubcategory = await exsubcategoryModle.find({})
        return res.render('product/add_product', {
            category: category,
            subcategory: subcategory,
            exsubcategory: exsubcategory
        })

    } catch (error) {
        console.log(error);
        return false;

    }
}
const insertproduct = async (req, res) => {
    // console.log(req.body.category);
    try {
        const { category, subcategory, exsubcategory, product, description, qnty, price, } = req.body;
        // console.log(req.body);
        console.log(req.file.path);
        await productModle.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategoryId: exsubcategory,
            product: product,
            description: description,
            qnty: qnty,
            price: price,
            image: req.file.path
        })
        console.log('Added Product...');
        return res.redirect('/product')


    } catch (error) {
        console.log(error);
        return false;

    }

}
const deletProduct = async (req, res) => {
    try {
        const deleteid = req.query.deleteId
        // fs.unlinkSync(deleteid)
        await productModle.findByIdAndDelete(deleteid)
        console.log('Product Deleted...');
        return res.redirect('/product')

    } catch (error) {
        console.log(error);
        return false;

    }
}
const editProduct = async (req, res) => {
    try {
        editid = req.query.editid;
        // console.log(editid);
        const category = await categoryModle.find({})
        const subcategory = await subcategoryModle.find({}).populate("categoryId")
        const exsubcategory = await exsubcategoryModle.find({}).populate("categoryId").populate("subcategoryId")
        const single = await productModle.findById(editid).populate("categoryId").populate("subcategoryId").populate("exsubcategoryId");
        // console.log(single)

        return res.render('product/edit_product', {
            single: single,
            category: category,
            subcategory: subcategory,
            exsubcategory: exsubcategory
        })

    } catch (error) {
        console.log(error);
        return false;

    }
}

const updateProduct = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory, product,description,qnty,price} = req.body;
        console.log(req.body);
        
        if (req.file) {
            const single = await productModle.findById(editid);
            fs.unlinkSync(single.image);
            await productModle.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                product: product,
                description: description,
                qnty: qnty,
                price: price,
                image: req.file.path

            })
            console.log("Updated..");
            return res.redirect('/product')
        } else {
            const single = await productModle.findById(editid);
            await productModle.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                product: product,
                description: description,
                qnty: qnty,
                price: price,
                image: single.image

            })
            console.log("Updated..");
            return res.redirect('/product')
        }
    
        console.log('Product Updated...');
        return res.redirect('/product')

    } catch (error) {
        console.log(error);
        return false;

    }
}
const statusChange = async (req, res) => {
    try {
        const status = req.query.status;
        const statusid = req.query.statusid;

        // Toggle the status
        const newStatus = status === 'active' ? 'inactive' : 'active';

        // Update the product's status
        await productModle.findByIdAndUpdate(statusid, {
            status: newStatus
        });

        console.log(`Product Status Changed to ${newStatus}...`);
        return res.redirect('/product');
    } catch (error) {
        console.log(error);
        return res.redirect('/product'); // Redirect even on error
    }
};

const categoryWiseFilter = async(req,res) => {
    try{
        let id = req.query.id;
        let subcat = await subcategoryModle.find({}).populate("categoryId");
        let fil = subcat.filter((val)=>{
            return val.categoryId.id == id;
        })
        return res.json({
            category : fil
        })
    }catch(err){
        console.log(err);
        return false;
    }
}
const subcategoryWiseFilter = async(req,res) => {
    try{
        let id = req.query.id;
        let exsubcat = await exsubcategoryModle.find({}).populate('subcategoryId');
        let fil = exsubcat.filter((val)=>{
            return val.subcategoryId.id == id;
        })
        return res.json({
            subcategory : fil
        })
    }catch(err){
        console.log(err);
        return false;
    }
}
module.exports = {
    ViewProductpage, AddProductpage, insertproduct, deletProduct, editProduct, statusChange, updateProduct,categoryWiseFilter,subcategoryWiseFilter
}