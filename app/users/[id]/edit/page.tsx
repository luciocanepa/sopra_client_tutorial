"use client";

import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Button, Form, Input } from "antd";
import { formatDate } from "@/utils/helper";

const EditProfile: React.FC = () => {
  const apiService = useApi();
  const { id } = useParams();
  const router = useRouter();
  const [form] = Form.useForm();

  const {
    value: token,
  } = useLocalStorage<string>("token", "");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      const user: User = await apiService.get<User>(`/users/${id}`, token);
      setUser(user);
      // Prepopulate form with user data
      form.setFieldsValue({
        username: user.username,
        name: user.name || "",
        bio: user.bio || "",
      });
    };
    fetchUser();
  }, [apiService, token, id, form]);

  // Handlers
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await apiService.put<User>(`/users/${id}`, token, {
        username: values.username,
        name: values.name || null,
        bio: values.bio || null,
      });
      router.push(`/users/${id}`);
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/users/${id}`);
  };

  const nameToDisplay = user?.id + " - " + (user?.name ? user?.name : user?.username);

  return (
    <div>
      <Card title={nameToDisplay}>
        <div>
          <div>
            <Form form={form} layout="vertical">
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please enter a username" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Bio" name="bio">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Form>
            <p><span>Status:</span> {user?.status}</p>
            <p><span>Creation Date:</span> {formatDate(user?.creationDate)}</p>
          </div>

          <div>
            <Button type="default" onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSave} loading={loading}>Save</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditProfile;