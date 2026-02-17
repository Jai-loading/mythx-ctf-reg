import { z } from "zod";

export const RegistrationSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name is too long")
        .trim(),
    email: z.string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
    phone: z.string()
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    college: z.string()
        .min(2, "Please select or enter your college")
        .trim(),
    branch: z.string().optional().or(z.literal("")),
    rollno: z.string().optional().or(z.literal("")),
    othercollege: z.string().optional().or(z.literal("")),
    documentKey: z.string().optional(), // Store the S3 key of the uploaded document
}).refine((data) => {
    // Logic for KIET students
    if (data.college.toLowerCase().includes("kiet")) {
        return !!data.branch && !!data.rollno;
    }
    return true;
}, {
    message: "Branch and Roll Number are required for KIET students",
    path: ["branch"],
});

export type RegistrationData = z.infer<typeof RegistrationSchema>;
