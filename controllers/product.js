const formidable = require('formidable') //formidable vs multer
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/product')
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    // let form =  new formidable.IncomingForm()
    // form.keepExtensions = true
    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: 'Image not be uploaded'
    //         })
    //     }
    //     let product  = new Product(fields)

    //     if (files.photo) {
    //         product.photo.data = fs.readFileSync(files.photo.path)
    //         product.photo.contentType = files.photo.type
    //     }

    //     product.save((err, result) => {
    //         if (err) {
    //             console.log(err)
    //             return res.status(400).json({
    //                 error: errorHandler(err)
    //             })
    //         }
    //         res.json(result)
    //     })
    // })
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image not be uploaded'
            })
        }

        //check for all fields
        const {name, description, price, category, quantity, shipping} = fields

        if ( !name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            })
        }

        let product = new Product(fields)

        //1kb = 1000
        //1mb = 1000000
        if (files.photo) {
            console.log('FILE PHOTO: ', files.photo)
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })

}