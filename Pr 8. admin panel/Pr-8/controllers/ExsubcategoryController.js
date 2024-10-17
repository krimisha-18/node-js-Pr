const categoryModle = require('../models/CatagoryModle')
const subcategoryModle = require('../models/SubCategoryModle')
const exsubcategoryModle = require('../models/ExsubcategoryModle');


const ViewExsubcatagorypage = async (req, res) => {
    try {
        let exsubcategory = await exsubcategoryModle.find({}).populate("categoryId").populate('subcategoryId');
        // console.log(exsubcategory);
        
        return res.render('exsubcategory/view_exsubcategory',{
            exsubcategory:exsubcategory
        })

    } catch (error) {
        console.log(error);
        return false;

    }
}
const AddExsubatagorypage = async(req, res) => {
    try {
        const category = await categoryModle.find({})
        const subcategory = await subcategoryModle.find({})
        return res.render('exsubcategory/add_exsubcategory',{
            category:category,
            subcategory:subcategory
        })
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}

const insertExsubcategory = async (req, res) => {
    try {
        const{category, subcategory,exsubcategory} = req.body;
        // console.log(req.body);
        await exsubcategoryModle.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategory:exsubcategory

        })
        console.log('Added Exsubcategory...');
        return res.redirect('/exsubcategory')


    } catch (error) {
        console.log(error);
        return false;

    }

}

const deletExsubCatagory = async (req, res) => {
    try {
        deleteid = req.query.deleteId;
        // console.log(deleteid);

        await exsubcategoryModle.findByIdAndDelete(deleteid);
        console.log('ExsubCategory Deleted...');
        return res.redirect('/exsubcategory')

    } catch (error) {
        console.log(error);
        return false;

    }
}
const editExsubCatagory = async (req, res) => {
    try {
        editid = req.query.editid;
        // console.log(editid);
        const category = await categoryModle.find({})
        const subcategory = await subcategoryModle.find({}).populate("categoryId")
        const single = await exsubcategoryModle.findById(editid).populate("categoryId").populate("subcategoryId");;
        // console.log(single);
        
        return res.render('exsubcategory/edit_exsubcategory', {
            single:single,
            category:category,
            subcategory:subcategory
        })

    } catch (error) {
        console.log(error);
        return false;

    }
}

const updateExsubcategory = async (req, res) => {
    try {
        const { editid, category , subcategory,exsubcategory} = req.body;
        // console.log(editid,category);
        await exsubcategoryModle.findByIdAndUpdate(editid, {
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategory:exsubcategory
        })
        console.log('ExsubCategory Updated...');
        return res.redirect('/exsubcategory')
        

    } catch (error) {
        console.log(error);
        return false;

    }
}
const statusChange = async(req,res) =>{
    try {
        const status = req.query.status;
        const statusid = req.query.statusid;
        // console.log(status,statusid);
        if(status == 'active'){
            await exsubcategoryModle.findByIdAndUpdate(statusid,{
                status: 'inactive'
            })
            console.log('Category Status Changed to Inactive...');
            return res.redirect('/exsubcategory')
        }else{
            await exsubcategoryModle.findByIdAndUpdate(statusid,{
                status: 'active'
            })
            console.log('Category Status Changed to Active...');
            return res.redirect('/exsubcategory')
        }
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}

// Ajex fot filter categorywise
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
module.exports = {
    ViewExsubcatagorypage,AddExsubatagorypage,insertExsubcategory,deletExsubCatagory,statusChange,editExsubCatagory,updateExsubcategory,categoryWiseFilter
}