// Add permission management to user slice
export interface UserPermissions {
  can_collect_samples: boolean;
  can_process_billing: boolean;
  can_manage_appointments: boolean;
}

export const createUserSlice = (set: any, get: any) => ({
  // ... existing code ...

  updateUserPermissions: (userId: string, permissions: Partial<UserPermissions>) =>
    set((state: UserState) => ({
      users: state.users.map(user =>
        user.id === userId
          ? {
              ...user,
              permissions: { ...(user.permissions || {}), ...permissions }
            }
          : user
      )
    })),

  // ... rest of the existing code ...
});