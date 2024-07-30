var express = require("express");
const Response = require("../lib/response");
const User = require("../database/models/Users");
const _enum = require("../config/enum");
const logger = require("../lib/logger/logger");
const auditLogs = require("../lib/auditLogs");
const Group = require("../database/models/Groups");
var router = express.Router();

router.get("/all-groups", async (req,res)=>{
    try {
        const result = await Group.find({})

        return res
        .status(_enum.HTTP_CODES.CREATED)
        .json(Response.successResponse({ success: true, list: result }));
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