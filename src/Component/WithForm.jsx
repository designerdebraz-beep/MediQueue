"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; 

import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField
} from "@heroui/react";

export function WithForm({ tutorId, remainingSlots }) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter(); 

  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); 

  
  if (remainingSlots <= 0) {
    return (
      <Button disabled className="bg-gray-400 text-white py-3 px-5 rounded-lg cursor-not-allowed">
        No Slots Available
      </Button>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const bookingData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      tutorName: formData.get("tutorName"),
      tutorId: tutorId, 
    };

    try {
     
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/bookings`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData), 
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to submit booking");

      console.log("Success:", result);
      toast.success("Your booking is confirmed!");
      form.reset();
      setIsSubmitted(true);
      
      
      router.refresh(); 

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => setIsSubmitted(false), 300);
    }
  };

  return (
    <Modal open={open} onOpenChange={handleOpenChange}>
      <Button
        onClick={() => setOpen(true)}
        className="bg-[#2d9282] hover:bg-[#227064] text-white py-3 px-5 rounded-lg"
      >
        Book Session
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                {isSubmitted ? "Thank You!" : "Book your session"}
              </Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                {isSubmitted ? "Your registration was successful." : "Book your session to your fav teacher"}
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <TextField isRequired defaultValue={user?.name} className="w-full" name="name" type="text">
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" />
                    </TextField>

                    {/* Email */}
                    <TextField isRequired defaultValue={user?.email} className="w-full" name="email" type="email">
                      <Label>Email</Label>
                      <Input placeholder="Enter your email" />
                    </TextField>

                    {/* Phone */}
                    <TextField isRequired className="w-full" name="phone" type="tel">
                      <Label>Phone</Label>
                      <Input placeholder="Enter your phone number" />
                    </TextField>

                    {/* Tutor Name */}
                    <TextField isRequired className="w-full" name="tutorName" type="text">
                      <Label>Tutor Name</Label>
                      <Input placeholder="Enter your Tutor name" />
                    </TextField>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-[#2d9282] hover:bg-[#227064] text-white"
                    >
                      {loading ? "Processing..." : "Confirm Booking"}
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
                    <div className="text-emerald-500 text-5xl">🎉</div>
                    <h3 className="text-lg font-semibold text-neutral-800">Booking Confirmed!</h3>
                    <p className="text-sm text-neutral-500 max-w-[280px]">
                      We have received your request. Your tutor will contact you shortly.
                    </p>
                    <Button
                      onClick={() => handleOpenChange(false)}
                      className="mt-2 bg-[#2d9282] hover:bg-[#227064] text-white w-full sm:w-auto"
                    >
                      Close Window
                    </Button>
                  </div>
                )}
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}