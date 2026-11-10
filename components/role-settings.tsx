"use client";

import { useState } from "react";
import { Check, RotateCcw, Save, ShieldCheck, UsersRound } from "lucide-react";

const permissionGroups = [
  { id: "people", label: "People", description: "Employee profiles and records" },
  { id: "attendance", label: "Time & attendance", description: "Schedules and timesheets" },
  { id: "timeOff", label: "Time off", description: "Leave requests and balances" },
  { id: "payroll", label: "Payroll", description: "Compensation and pay runs" },
  { id: "hiring", label: "Hiring", description: "Open roles and candidates" },
  { id: "reports", label: "Reports", description: "Workforce reports and insights" },
  { id: "settings", label: "Workspace settings", description: "Workspace configuration" },
] as const;

type PermissionId = (typeof permissionGroups)[number]["id"];
type RoleId = "owner" | "hr-admin" | "manager" | "employee";
type RolePermissions = Record<RoleId, Record<PermissionId, boolean>>;

const roles: { id: RoleId; name: string; description: string; members: number }[] = [
  { id: "owner", name: "Workspace owner", description: "Full control of the workspace", members: 2 },
  { id: "hr-admin", name: "HR administrator", description: "Manage people operations", members: 8 },
  { id: "manager", name: "Manager", description: "Support a team and its requests", members: 24 },
  { id: "employee", name: "Employee", description: "Access personal information and tools", members: 214 },
];

const initialPermissions: RolePermissions = {
  owner: { people: true, attendance: true, timeOff: true, payroll: true, hiring: true, reports: true, settings: true },
  "hr-admin": { people: true, attendance: true, timeOff: true, payroll: true, hiring: true, reports: true, settings: true },
  manager: { people: true, attendance: true, timeOff: true, payroll: false, hiring: true, reports: true, settings: false },
  employee: { people: true, attendance: true, timeOff: true, payroll: false, hiring: false, reports: false, settings: false },
};

export function RoleSettings() {
  const [selectedRole, setSelectedRole] = useState<RoleId>("hr-admin");
  const [permissions, setPermissions] = useState<RolePermissions>(initialPermissions);
  const [savedPermissions, setSavedPermissions] = useState<RolePermissions>(initialPermissions);
  const [notice, setNotice] = useState("");
  const selectedRoleInfo = roles.find((role) => role.id === selectedRole);
  const hasChanges = permissionGroups.some(
    ({ id }) => permissions[selectedRole][id] !== savedPermissions[selectedRole][id],
  );

  function updatePermission(permission: PermissionId, enabled: boolean) {
    setPermissions((current) => ({
      ...current,
      [selectedRole]: { ...current[selectedRole], [permission]: enabled },
    }));
  }

  function saveChanges() {
    setSavedPermissions((current) => ({
      ...current,
      [selectedRole]: { ...permissions[selectedRole] },
    }));
    setNotice(`${selectedRoleInfo?.name} permissions saved.`);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function discardChanges() {
    setPermissions((current) => ({
      ...current,
      [selectedRole]: { ...savedPermissions[selectedRole] },
    }));
  }

  return (
    <div className="module-page role-settings-page">
      {notice && <div className="toast-message"><Check size={16} />{notice}</div>}
      <div className="module-heading">
        <div>
          <div className="eyebrow">WORKSPACE PREFERENCES</div>
          <h1>Role settings</h1>
          <p>Choose what people can view and manage based on their role.</p>
        </div>
        <button className="primary-button" disabled={!hasChanges} onClick={saveChanges}>
          <Save size={16} /> Save changes
        </button>
      </div>

      <div className="role-settings-layout">
        <section className="panel role-list-panel" aria-labelledby="roles-heading">
          <div className="role-section-heading">
            <div>
              <h2 id="roles-heading">Roles</h2>
              <p>Choose a role to edit its access.</p>
            </div>
            <span className="role-count">{roles.length}</span>
          </div>
          <div className="role-list">
            {roles.map((role) => (
              <button
                aria-pressed={selectedRole === role.id}
                className={`role-option ${selectedRole === role.id ? "role-option-selected" : ""}`}
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
              >
                <span className="role-option-icon"><ShieldCheck size={17} /></span>
                <span className="role-option-copy">
                  <strong>{role.name}</strong>
                  <small>{role.description}</small>
                </span>
                <span className="role-option-members"><UsersRound size={12} />{role.members}</span>
              </button>
            ))}
          </div>
          <div className="role-list-note">
            <ShieldCheck size={15} />
            <span>Workspace owners always retain full access.</span>
          </div>
        </section>

        <section className="panel permission-panel" aria-labelledby="permissions-heading">
          <div className="permission-panel-heading">
            <div>
              <div className="eyebrow">ROLE ACCESS</div>
              <h2 id="permissions-heading">{selectedRoleInfo?.name}</h2>
              <p>{selectedRoleInfo?.description}</p>
            </div>
            <span className="member-count"><UsersRound size={14} />{selectedRoleInfo?.members} members</span>
          </div>
          <div className="permission-list">
            {permissionGroups.map(({ id, label, description }) => (
              <label className="permission-row" key={id}>
                <span className="permission-copy">
                  <strong>{label}</strong>
                  <small>{description}</small>
                </span>
                <input
                  aria-label={`${label} access for ${selectedRoleInfo?.name}`}
                  checked={permissions[selectedRole][id]}
                  onChange={(event) => updatePermission(id, event.target.checked)}
                  disabled={selectedRole === "owner"}
                  type="checkbox"
                />
              </label>
            ))}
          </div>
          <div className="permission-footer">
            <span>{hasChanges ? "Unsaved changes" : "All changes saved"}</span>
            <button className="secondary-button" disabled={!hasChanges} onClick={discardChanges}>
              <RotateCcw size={14} /> Discard
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
