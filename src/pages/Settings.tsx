import React, { useEffect, useState } from "react";
import {
  UserCircle,
  Shield,
  LogOut,
  CheckCircle,
} from "lucide-react";
import { getCurrentUser } from "../api/auth";

interface SettingsProps {
  onLogout?: () => void;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

export const Settings: React.FC<SettingsProps> = ({
  onLogout,
}) => {
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState("");

  const [profile, setProfile] =
    useState<UserProfile>({
      id: 0,
      username: "",
      email: "",
    });

  const [passwords, setPasswords] =
    useState({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getCurrentUser();

        setProfile({
          id: user.id,
          username: user.username,
          email: user.email,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleProfileSave = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    showToast(
      "Profile update endpoint will be added soon."
    );
  };

  const handlePasswordSave = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    showToast(
      "Password update endpoint will be added soon."
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          fontSize: "20px",
        }}
      >
        Loading Settings...
      </div>
    );
  }
  
    return (
    <div className="page-container">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1>Settings</h1>
          <p style={{ color: "var(--color-text-light)" }}>
            Manage your account and security.
          </p>
        </div>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(420px,1fr))",
          gap: "2rem",
        }}
      >

        {/* Profile */}

        <form
          className="card"
          onSubmit={handleProfileSave}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <UserCircle size={24} />
            <h2>Profile</h2>
          </div>

          <div className="input-group">
            <label className="input-label">
              Username
            </label>

            <input
              className="input-field"
              value={profile.username}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  username: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              Email
            </label>

            <input
              className="input-field"
              value={profile.email}
              disabled
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Profile
          </button>

        </form>

        {/* Password */}

        <form
          className="card"
          onSubmit={handlePasswordSave}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".75rem",
            }}
          >
            <Shield size={24} />
            <h2>Security</h2>
          </div>

          <div className="input-group">
            <label className="input-label">
              Current Password
            </label>

            <input
              type="password"
              className="input-field"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  current: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              New Password
            </label>

            <input
              type="password"
              className="input-field"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="input-field"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Change Password
          </button>

        </form>
                {/* Logout */}

        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".75rem",
            }}
          >
            <LogOut size={24} />
            <h2>Account</h2>
          </div>

          <p style={{ color: "var(--color-text-light)" }}>
            Sign out from your InventAI account.
          </p>

          <button
            className="btn btn-danger"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>

        {/* About */}

        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h2>About InventAI</h2>

          <p>
            <strong>Version:</strong> 1.0.0
          </p>

          <p>
            <strong>Frontend:</strong> React + TypeScript + Vite
          </p>

          <p>
            <strong>Backend:</strong> FastAPI
          </p>

          <p>
            <strong>Database:</strong> PostgreSQL
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: "#22c55e",
                fontWeight: 600,
              }}
            >
              Connected
            </span>
          </p>
        </div>

      </div>

      {toast && (
        <div
          className="toast-container"
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            background: "#16a34a",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,.15)",
            zIndex: 9999,
          }}
        >
          <CheckCircle size={18} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};