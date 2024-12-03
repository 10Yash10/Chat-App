import React, { useEffect } from "react";
import { useAppStore } from "../../store";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Chat() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast.warning(
        "Profile Setup is not completed yet. Please complete it to move further"
      );
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div>Chat</div>;
}

export default Chat;
