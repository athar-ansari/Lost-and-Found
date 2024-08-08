import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Report from "@/Pages/Report";
import { Button } from "../ui/button";
import { useToast, ToastAction } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

const ReportBtn = ({ isDialogOpen, setIsDialogOpen }) => {
  const { toast, dismiss } = useToast();
  const [toastId, setToastId] = useState(null);
  const navigate = useNavigate();
  const isSignedIn = localStorage.getItem("isLogin") === "true";

  const handleClick = () => {
    if (isSignedIn) {
      setIsDialogOpen(true);
    } else {
      const id = toast({
        title: "Authentication Required",
        description: "You must be logged in to view this content.",
        action: (
          <ToastAction
            className="font-bold"
            altText="Login"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Login
          </ToastAction>
        ),
      }).id;
      setToastId(id);
    }
  };

  useEffect(() => {
    if (toastId) {
      const timer = setTimeout(() => {
        dismiss(toastId);
        setToastId(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [toastId, dismiss]);

  return (
    <>
      <Button
        onClick={handleClick}
        className="font-lora italic font-semibold text-lg lg:hidden"
      >
        Report
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[450px] xs:w-[375px] h-auto">
          <DialogHeader>
            <DialogTitle className="font-lora text-xl h-auto">
              Report Details
            </DialogTitle>
          </DialogHeader>
          <Report />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportBtn;
