const Customer = require("../models/Customer.js");
const mongoose = require('mongoose');
exports.homepage = async (req ,res)=>{
    const messages = await req.consumeFlash('info');
    const locals = {
      title: 'NodeJs',
      description: 'Free NodeJs User Management System'
    }

    let perPage = 12;
    let page = req.query.page || 1;

    try {
      const customers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Customer.count();
      console.log(customers);
      res.render('index', {
        locals,
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        messages
      });

    } catch (error) {
      console.log(error);
    }   
    
}
exports.addCustomer = async (req ,res)=>{
   
    const locals ={
        title: 'Add New User',
        description :'Add New User System'
    }

    res.render('Customer/add', locals); 

}
exports.postCustomer = async (req ,res)=>{
//    console.log(req.body);
    const newCustomer = new Customer({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        details: req.body.details,
        tel : req.body.tel,
        email :req.body.email

    })
   try{
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");
    res.redirect('/');
    
   }catch(err){
    console.log(err);
   }

    // res.render('Customer/add', locals); 

}

exports.viewCustomer = async (req,res)=>{
    console.log(req.params)
    try {
        const customer = await Customer.findOne({ _id: req.params.id })
        console.log(customer);
        const locals ={
            title: 'View User',
            description :'View User System'
        }

        res.render('Customer/view',{locals,customer})
        console.log(Customer);
    }
    catch(err){
        console.log(err);
    }
    
}

exports.editCustomer = async (req,res)=>{
  // console.log(req.body);
  try {
      const customer = await Customer.findOne({ _id: req.params.id })
      console.log(customer);
      const locals ={
          title: 'Edit User',
          description :'Edit User System'
      }

      res.render('Customer/edit',{locals,customer})
      // console.log(Customer);
  }
  catch(err){
      console.log(err);
  }
  
}

exports.editPostUser = async (req, res) => {
  // try {
  //   await Customer.findByIdAndUpdate(req.params.id,{
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     tel: req.body.tel,
  //     email: req.body.email,
  //     details: req.body.details,
  //     updatedAt: Date.now()
  //   });
  //   await res.redirect(`/edit/${req.params.id}`);
    
  //   console.log('redirected');
  // } catch (error) {
  //   console.log(error);
  // }
}

