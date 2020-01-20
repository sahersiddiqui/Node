// var express = require('express');
import { Router, Response } from "express"
import api from "./api";
const router: Router = Router()

router.use('/api', api);

export default router