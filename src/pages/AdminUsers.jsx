import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

export const AdminUsers = () => {
  const initialUsers = [
    {
      id: 1,
      name: "Prasad",
      email: "prasad@example.com",
      role: "User",
    },
    {
      id: 2,
      name: "Rahul",
      email: "rahul@example.com",
      role: "User",
    },
    {
      id: 3,
      name: "Admin",
      email: "admin@example.com",
      role: "Admin",
    },
  ];

  const [users, setUsers] = useState(initialUsers);

  const [editingUserId, setEditingUserId] = useState(null);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleDeleteUser = (userId) => {
    setUsers((previousUsers) =>
      previousUsers.filter((user) => user.id !== userId),
    );
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserRole(user.role);
  };

  const handleSaveUser = () => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === editingUserId
          ? {
              ...user,
              name: userName,
              email: userEmail,
              role: userRole,
            }
          : user,
      ),
    );

    setEditingUserId(null);
  };

  return (
    <Container className="mt-4">
      <h1>Admin Users</h1>
      {editingUserId !== null && (
        <Card className="mt-4">
          <Card.Body>
            <h4>Edit User</h4>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
              </Form.Group>
              <Button variant="success" onClick={handleSaveUser}>
                Save User
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {users.map((user) => (
        <Card className="mt-3 shadow-sm" key={user.id}>
          <Card.Body>
            <h5>{user.name}</h5>
            <p>
              <b>Email:</b> {user.email}
            </p>
            <p>
              <b>Role:</b> {user.role}
            </p>
            <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
              Delete
            </Button>
            <Button
              variant="warning"
              className="me-2"
              onClick={() => handleEditUser(user)}
            >
              Edit
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
