import React, { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Info,
  AlertTriangle,
  Trash2,
} from "lucide-react";

import api from "../api/api";

interface Notification {
  id: number;
  message: string;
  type: "info" | "alert";
  status: "read" | "unread";
  created_at: string;
}

export const Notifications: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        /*
         * Replace this once the backend endpoint exists.
         *
         * Example:
         *
         * const res = await api.get("/notifications");
         * setNotifications(res.data);
         */

        setNotifications([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const markNotificationRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              status: "read",
            }
          : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => notification.id !== id
      )
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return (
          <AlertTriangle
            size={20}
            className="text-warning"
          />
        );

      case "info":
        return (
          <Info
            size={20}
            className="text-info"
          />
        );

      default:
        return (
          <Bell
            size={20}
            className="text-primary"
          />
        );
    }
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
        Loading Notifications...
      </div>
    );
  }
    return (
    <div
      className="page-container"
      style={{ padding: 0 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1
            style={{
              color: "var(--color-primary-dark)",
            }}
          >
            Notifications
          </h1>

          <p
            style={{
              color: "var(--color-text-light)",
            }}
          >
            System alerts and updates.
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{ padding: 0 }}
      >
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              color: "var(--color-text-light)",
            }}
          >
            <Bell
              size={48}
              style={{
                opacity: 0.25,
                marginBottom: "1rem",
              }}
            />

            <p>No notifications available.</p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {notifications.map(
              (notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: "1.5rem",
                    borderBottom:
                      "1px solid var(--color-border)",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    background:
                      notification.status ===
                      "unread"
                        ? "var(--color-surface-hover)"
                        : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent:
                        "center",
                      alignItems: "center",
                      background:
                        "var(--color-surface)",
                    }}
                  >
                    {getIcon(notification.type)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        marginBottom:
                          ".4rem",
                      }}
                    >
                      <strong>
                        {notification.type ===
                        "alert"
                          ? "System Alert"
                          : "Information"}
                      </strong>

                      <small>
                        {new Date(
                          notification.created_at
                        ).toLocaleString()}
                      </small>
                    </div>

                    <p
                      style={{
                        margin: 0,
                      }}
                    >
                      {notification.message}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: ".5rem",
                    }}
                  >
                    {notification.status ===
                      "unread" && (
                      <button
                        className="btn btn-ghost"
                        onClick={() =>
                          markNotificationRead(
                            notification.id
                          )
                        }
                        title="Mark as Read"
                      >
                        <Check size={18} />
                      </button>
                    )}

                    <button
                      className="btn btn-ghost"
                      onClick={() =>
                        deleteNotification(
                          notification.id
                        )
                      }
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};