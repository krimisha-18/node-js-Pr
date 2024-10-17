const categoryModle = require('../models/CatagoryModle')
const subcategoryModle = require('../models/SubCategoryModle')

const ViewSubcatagorypage = async (req, res) => {
    try {
        let subcategory = await subcategoryModle.find({}).populate("categoryId");
        console.log(subcategory);
        
        return res.render('subcategory/view_subcategory',{
            subcategory:subcategory
        })

    } catch (error) {
        console.log(error);
        return false;

    }
}
const Addsubatagorypage = async(req, res) => {
    try {
        const category = await categoryModle.find({})
        return res.render('subcategory/add_subcategory',{
            category:category
        })
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}

const insertSubcategory = async (req, res) => {
    // console.log(req.body.category);
    try {
        const{category, subcategory} = req.body
        console.log(req.body);
        
        
        await subcategoryModle.create({
            categoryId: category,
            subcategory: subcategory

        })
        console.log('Added Subcategory...');
        return res.redirect('/subcategory')


    } catch (error) {
        console.log(error);
        return false;

    }



}

const deletSubCatagory = async (req, res) => {
    try {
        deleteid = req.query.deleteId;
        // console.log(deleteid);

        await subcategoryModle.findByIdAndDelete(deleteid);
        console.log('SubCategory Deleted...');
        return res.redirect('/subcategory')

    } catch (error) {
        console.log(error);
        return false;

    }
}
const editSubCatagory = async (req, res) => {
    try {
        editid = req.query.subeditid;
        // console.log(editid);
        const category = await categoryModle.find({})
        const single = await subcategoryModle.findById(editid).populate("categoryId");
        // console.log(single);
        
        return res.render('subcategory/edit_subcategory', {
            single:single,
            category:category
        })

    } catch (error) {
        console.log(error);
        return false;

    }
}

const updateSubcategory = async (req, res) => {
    try {
        const { editid, category , subcategory} = req.body;
        // console.log(editid,category);
        await subcategoryModle.findByIdAndUpdate(editid, {
            categoryId: category,
            subcategory: subcategory
        })
        console.log('subCategory Updated...');
        return res.redirect('/subcategory')
        

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
            await subcategoryModle.findByIdAndUpdate(statusid,{
                status: 'inactive'
            })
            console.log('Category Status Changed to Inactive...');
            return res.redirect('/subcategory')
        }else{
            await subcategoryModle.findByIdAndUpdate(statusid,{
                status: 'active'
            })
            console.log('Category Status Changed to Active...');
            return res.redirect('/subcategory')
        }
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}
module.exports = {
    ViewSubcatagorypage,Addsubatagorypage,insertSubcategory,deletSubCatagory,statusChange,editSubCatagory,updateSubcategory
}