var express = require("express");
const Response = require("../lib/response");
const User = require("../database/models/Users");
const _enum = require("../config/enum");
const logger = require("../lib/logger/logger");
const auditLogs = require("../lib/auditLogs");
const Group = require("../database/models/Groups");
const ProductCategory = require("../database/models/ProductCategory");
const Product = require("../database/models/Product");
var router = express.Router();

router.get("/create-category", async (req,res)=>{
    try {
        const result = await ProductCategory.find({})

        const categories = [
            {
                name:"Çıkartmalar",
            },
            {
                name:"Temalar",
            }
        ]

        if(result.length == 0){
            categories.map( async (item) => {
                await new ProductCategory({name: item.name}).save()
            })

            return res
            .status(_enum.HTTP_CODES.CREATED)
            .json(Response.successResponse({ success: true }));
        }
     

        return res
        .status(_enum.HTTP_CODES.CREATED)
        .json(Response.successResponse({ success: false }));
    } catch (error) {
        console.log(error);
        auditLogs.error(req.user?.id || "Group", "Groups", "GET /all-groups", error);
        logger.error(req.user?.id || "Group", "Groups", "GET /all-groups", error);
        res
          .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
          .json(Response.errorResponse(error));
    }
})

router.get("/create-product", async (req,res)=>{
    try {

        const products = [
            {
                name:"Kuşlar Çıkartma Paketi",
                imageUrl:"https://image.ahmetselimboz.com.tr/kartal-chat-app/sticker/birds.png",
                price:"2,99",
                categoryId:"66b16b68e2c5c7edb62c02a0",
            },
            {
                name:"Kediler Çıkartma Paketi",
                imageUrl:"https://image.ahmetselimboz.com.tr/kartal-chat-app/sticker/cats.png",
                price:"4,49",
                categoryId:"66b16b68e2c5c7edb62c02a0",
            },
            {
                name:"Emoji Çıkartma Paketi",
                imageUrl:"https://image.ahmetselimboz.com.tr/kartal-chat-app/sticker/emojis.png",
                price:"2,99",
                categoryId:"66b16b68e2c5c7edb62c02a0",
            },
            {
                name:"Tepkiler Çıkartma Paketi",
                imageUrl:"https://image.ahmetselimboz.com.tr/kartal-chat-app/sticker/emotions.png",
                price:"3,99",
                categoryId:"66b16b68e2c5c7edb62c02a0",
            },
            {
                name:"Eğlenceli Çıkartma Paketi",
                imageUrl:"https://image.ahmetselimboz.com.tr/kartal-chat-app/sticker/funny_stickers.png",
                price:"4,99",
                categoryId:"66b16b68e2c5c7edb62c02a0",
            },
            {
                name:"Filmler Çıkartma Paketi",
                imageUrl:"https://image.ahmetselimboz.com.tr/kartal-chat-app/sticker/movie.png",
                price:"3,49",
                categoryId:"66b16b68e2c5c7edb62c02a0",
            },
            {
                name:"Sarı-Mavi Çıkartma Paketi",
                imageUrl:"https://image.ahmetselimboz.com.tr/kartal-chat-app/sticker/yellow_blue.png",
                price:"0,99",
                categoryId:"66b16b68e2c5c7edb62c02a0",
            },

 

            {
                name: "Tema 1",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_1.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 2",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_2.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 3",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_3.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 4",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_4.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 5",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_5.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 6",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_6.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 7",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_7.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 8",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_8.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 9",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_9.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 10",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_10.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 11",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_11.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            },
            {
                name: "Tema 12",
                imageUrl: "https://image.ahmetselimboz.com.tr/kartal-chat-app/theme/theme_12.png",
                price: "1,99",
                categoryId: "66b16b68e2c5c7edb62c02a1"
            }
        ]

        const result = await Product.find({})

        if(result.length == 0){
            products.map( async (item) => {
                await new Product({
                    name: item.name,
                    imageUrl: item.imageUrl,
                    price: item.price,
                    categoryId: item.categoryId,
                }).save()
            })

            return res
            .status(_enum.HTTP_CODES.CREATED)
            .json(Response.successResponse({ success: true }));
        }
     

        return res
        .status(_enum.HTTP_CODES.CREATED)
        .json(Response.successResponse({ success: false }));
    } catch (error) {
        console.log(error);
        auditLogs.error(req.user?.id || "Group", "Groups", "GET /all-groups", error);
        logger.error(req.user?.id || "Group", "Groups", "GET /all-groups", error);
        res
          .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
          .json(Response.errorResponse(error));
    }
})


module.exports= router