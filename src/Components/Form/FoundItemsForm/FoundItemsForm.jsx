import React, { useState, useEffect } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "@/Components/ui/button";
import { useToast } from "../../ui/use-toast";

const FoundItemsForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    semester: "",
    image: null,
    instagram: "",
    facebook: "",
    linkedin: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast, dismiss } = useToast();

  useEffect(() => {
    const showToast = localStorage.getItem("showToast");

    if (showToast === "success") {
      const toastId = toast({
        title: "Success",
        description: "Form submitted successfully",
        variant: "success",
      }).id;

      // Clear the flag from local storage immediately after showing the toast
      localStorage.removeItem("showToast");

      // Dismiss the toast after 2 seconds
      setTimeout(() => {
        dismiss(toastId);
      }, 2000);
    }
  }, [toast, dismiss]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to ensure at least one social media field is filled
    if (
      !formData.instagram &&
      !formData.facebook &&
      !formData.linkedin &&
      !formData.whatsapp
    ) {
      alert("Please provide at least one social media link.");
      return;
    }

    const email = localStorage.getItem("email");
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("department", formData.department);
    data.append("semester", formData.semester);
    data.append("image", formData.image);
    data.append("instagram", formData.instagram);
    data.append("facebook", formData.facebook);
    data.append("linkedin", formData.linkedin);
    data.append("whatsapp", formData.whatsapp);
    data.append("email", email || "");

    setLoading(true);

    try {
      const api = import.meta.env.VITE_API_URL;
      const response = await fetch(`${api}/item/submitFoundItem`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        // Set local storage item to show the toast message after reload
        localStorage.setItem("showToast", "success");
        // Delay the reload to ensure local storage change is applied
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 100);
      } else {
        toast({
          title: "Submission Failed",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4 font-medium">
      {/* Input fields and other components */}
      <div className="grid w-full max-w-sm items-center gap-1">
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Title of the Item"
          value={formData.title}
          onChange={handleChange}
          maxLength={24}
          required
        />
      </div>

      <div className="grid w-full gap-1">
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the Item."
          value={formData.description}
          onChange={handleChange}
          maxLength={500}
          required
        />
      </div>

      <div className="flex-1 mt-2">
        <Label htmlFor="image" className="mb">
          Upload Image
        </Label>
        <Input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      {/* Select fields */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 mt-2">
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="CSE">CSE</SelectItem>
              <SelectItem value="CSBS">CSBS</SelectItem>
              <SelectItem value="ECE">ECE</SelectItem>
              <SelectItem value="ME">ME</SelectItem>
              <SelectItem value="EE">EE</SelectItem>
              <SelectItem value="CIVIL">CIVIL</SelectItem>
              <SelectItem value="AIML">AIML</SelectItem>
              <SelectItem value="BCA">BCA</SelectItem>
              <SelectItem value="BA">BA</SelectItem>
              <SelectItem value="CSE_IOT">CSE (IOT)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 mt-2">
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, semester: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1st Semester">1st Semester</SelectItem>
              <SelectItem value="2nd Semester">2nd Semester</SelectItem>
              <SelectItem value="3rd Semester">3rd Semester</SelectItem>
              <SelectItem value="4th Semester">4th Semester</SelectItem>
              <SelectItem value="5th Semester">5th Semester</SelectItem>
              <SelectItem value="6th Semester">6th Semester</SelectItem>
              <SelectItem value="7th Semester">7th Semester</SelectItem>
              <SelectItem value="8th Semester">8th Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 mt-2">
          <Input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            placeholder="WhatsApp (10-digit)"
            value={formData.whatsapp}
            onChange={handleChange}
            pattern="[0-9]{10}"
          />
        </div>

        <div className="flex-1 mt-2">
          <Input
            type="url"
            id="instagram"
            name="instagram"
            placeholder="Instagram Link"
            value={formData.instagram}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 mt-2">
          <Input
            type="url"
            id="facebook"
            name="facebook"
            placeholder="Facebook Link"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>

        <div className="flex-1 mt-2">
          <Input
            type="url"
            id="linkedin"
            name="linkedin"
            placeholder="LinkedIn Link"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
      </div>

      <p className="text-xs font-bold text-red-400 xs:text-[0.70rem]">
        Social Media Link helps to Connect with You. Provide Minimum 1
      </p>
      <Button type="submit" className="mt-2 tracking-wider" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default FoundItemsForm;
