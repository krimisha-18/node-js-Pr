const categoryModle = require('../models/CatagoryModle')

const ViewCatagory = async (req, res) => {
    try {
        const category = await categoryModle.find({});
        return res.render('category/view_category', {
            category: category
        })

    } catch (error) {
        console.log(error);
        return false;

    }
}
const AddCatagory = (req, res) => {
    return res.render('category/add_category')
}

const insertCategory = async (req, res) => {
    // console.log(req.body.category);
    try {
        const category = req.body.category;
        await categoryModle.create({
            category: category,

        })
        // console.log('category add');
        req.flash('success', "Category Add Successfully");
           
        return res.redirect('/category')


    } catch (error) {
        console.log(error);
        return false;

    }



}

const deletCatagory = async (req, res) => {
    try {
        deleteid = req.query.deleteId;
        // console.log(deleteid);

        await categoryModle.findByIdAndDelete(deleteid);
        console.log('Category del');
        req.flash('success', "Category Deleted Successfully");
      
        return res.redirect('/category')

    } catch (error) {
        console.log(error);
        return false;

    }
}
const editCatagory = async (req, res) => {
    try {
        editid = req.query.editid;
        // console.log(editid);
        const single = await categoryModle.findById(editid);
        return res.render('category/edit_category', {
            single
        })
       
    } catch (error) {
        console.log(error);
        return false;

    }
}

const updateCategory = async (req, res) => {
    try {
        const { editid, category } = req.body;
        await categoryModle.findByIdAndUpdate(editid, {
            category: category
        })
        console.log('your category is being updated');
        return res.redirect('/category')
        

    } catch (error) {
        console.log(error);
        return false;

    }
}

const statusChange = async(req,res) =>{
    try {
        const status = req.query.status;
        const statusid = req.query.statusid;
        if(status == 'active'){
            await categoryModle.findByIdAndUpdate(statusid,{
                status: 'deactive'
            })
            console.log('your status is being changed(deactive)');
            return res.redirect('/category')
        }else{
            await categoryModle.findByIdAndUpdate(statusid,{
                status: 'active'
            })
            console.log('your status is being changed(active)');
            return res.redirect('/category')
        }
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}

module.exports = {
    ViewCatagory, AddCatagory, insertCategory, deletCatagory, editCatagory, updateCategory,statusChange
}