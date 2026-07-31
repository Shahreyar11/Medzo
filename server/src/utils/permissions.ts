export type Role = "OWNER" |"MANAGER" | "DOCTOR" | "RECEPTIONIST"| "PATIENT";

export type Permission = 
            |"appointment:create"
            |"appointment:update"
            |"appointment:reschedule"
            |"appointment:cancel"
            |"appointment:view_own"
            |"appointment:view_all"
            |"appointment:reject"
            |"appointment:approve"
            |"appointment:hold"

            |"queue:view"
            |"queue:call_next"
            |"queue:skip"
            |"queue:reorder"

            |"patient:view"
            |"patient:create"
            |"patient:update"
            |"patient:view_medical_history"

            |"clinic:update_settings"
            |"clinic:manage_schedule"

            |"report:view"
            |"audit:view_logs"

            |"user:promote_manager"
            |"user:demote_manager"
            |"user:promote_doctor"
            |"user:demote_doctor"
            |"user:promote_receptionist"
            |"user:demote_receptionist"


export const patientPermissions: Permission[] = [
    "appointment:create",
    "appointment:update",
    "appointment:reschedule",
    "appointment:cancel",
    "appointment:view_own"
]

export const receptionistPermissions: Permission[] = [
    "appointment:create",
    "appointment:update",
    "appointment:reschedule",
    "appointment:cancel",
    "appointment:view_all",
    "appointment:hold",

    "queue:view",
    "queue:call_next",
    "queue:skip",
    "queue:reorder",

    "patient:view",
    "patient:create",
    "patient:update"
]

export const doctorPermissions: Permission[] = [
    "appointment:view_own",
    "appointment:view_all",
    "appointment:approve",
    "appointment:reject",
    "appointment:hold",

    "queue:view",
    "queue:call_next",

    "patient:view",
    "patient:update",
    "patient:view_medical_history"
]

export const managerPermissions: Permission[] = [
    "appointment:view_all",
    "appointment:approve",
    "appointment:reject",
    "appointment:hold",

    "queue:view",
    "queue:reorder",

    "patient:view",
    "patient:view_medical_history",

    "clinic:update_settings",
    "clinic:manage_schedule",

    "report:view",
    "audit:view_logs",

    "user:promote_doctor",
    "user:demote_doctor",
    "user:promote_receptionist",
    "user:demote_receptionist"
]

export const ownerPermissions: Permission[] = [
    ...managerPermissions,
    "user:promote_manager",
    "user:demote_manager"
]

export	const rolePermissions:	Record<Role, Permission[]>	=	{
		OWNER:ownerPermissions,
		MANAGER:managerPermissions,
		DOCTOR:doctorPermissions,
		RECEPTIONIST:receptionistPermissions,
        PATIENT :patientPermissions
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}