"use client";

import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types/user";
import { useParams } from "next/navigation";
import { Button } from "antd";
import CustomCardComponent from "@/components/CustomCardComponent";

import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/helper";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const apiService = useApi();

  // localStorage
  const {
    value: token,
  } = useLocalStorage<string>("token", "");
  const {
    value: userId,
  } = useLocalStorage<string>("userId", "");

  const { id } = useParams();
  const router = useRouter();
  const isCurrentUser = userId === id;

  const [user, setUser] = useState<User | null>(null);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      const user: User = await apiService.get<User>(`/users/${id}`);
      setUser(user);
    };
    fetchUser();
  }, [apiService, token, id]);

  const userHeader = () => {
    const nameToDisplay = user?.name ? user?.name : user?.username;
    return (
      <>
        <p>{user?.id}</p>
        <h2>{nameToDisplay}</h2>
      </>
    );
  };

  const userBody = () => (
    <>
      <p>
        <span>Username:</span> {user?.username}
      </p>
      <p>
        <span>Status:</span> {user?.status}
      </p>
      <p>
        <span>Bio:</span> {user?.bio}
      </p>
      <p>
        <span>Creation Date:</span> {formatDate(user?.creationDate)}
      </p>
    </>
  );

  const userFooter = () => (
    <>
      <Button type="default" onClick={() => router.push(`/users`)}>
        Back to users
      </Button>
      {isCurrentUser && (
        <Button
          type="primary"
          onClick={() => router.push(`/users/${user?.id}/edit`)}
        >
          Edit
        </Button>
      )}
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CustomCardComponent
        header={userHeader()}
        body={userBody()}
        footer={userFooter()}
      />
    </div>
  );
};

export default Profile;
