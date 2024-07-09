import {z} from 'zod';

export const customerSchema = z.object({
    name: z.string().min(10).max(40),
    email: z.string().email(),
    phone: z.number(),
    address: z.string().min(10).max(255),
    dni: z.number(),
    
})