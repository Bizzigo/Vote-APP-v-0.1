
// Main auth service that exports all auth-related functions
// This file serves as the main entry point for authentication services

export { login, logout } from './auth/loginService';
export { updateUser, completeProfile } from './auth/profileService';
export { voteForCandidate } from './auth/voteService';
export { createOrUpdateVendor } from './auth/vendorService';
