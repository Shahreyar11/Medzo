import { Router } from "express";
import { authenticate } from "../utils/authenticate";
import { authorize } from "../utils/authorize";
import { promoteReceptionist } from "../controllers/staff.controller";
import { demoteReceptionist } from "../controllers/staff.controller";
import { promoteManager } from "../controllers/staff.controller";
import { demoteManager } from "../controllers/staff.controller";
import { promoteDoctor } from "../controllers/staff.controller";
import { demoteDoctor } from "../controllers/staff.controller";
const staffRoutes = Router()

staffRoutes.use(authenticate)

staffRoutes.patch("promote-receptionist", authorize("user:promote_receptionist"), promoteReceptionist)
staffRoutes.patch("demote-receptionist", authorize("user:demote_receptionist"), demoteReceptionist)
staffRoutes.patch("promote-manager", authorize("user:promote_manager"), promoteManager)
staffRoutes.patch("demote-manager", authorize("user:demote_manager"), demoteManager)
staffRoutes.patch("promote-doctor", authorize("user:promote_doctor"), promoteDoctor)
staffRoutes.patch("demote-doctor", authorize("user:demote_doctor"), demoteDoctor)

