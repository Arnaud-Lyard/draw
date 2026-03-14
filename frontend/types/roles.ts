import { Role } from "@/constants/Roles";

export type RoleType = (typeof Role)[keyof typeof Role];
