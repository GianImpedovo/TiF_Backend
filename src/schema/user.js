import z from 'zod'

const userSchema = z.object({
    _id: z.number().int(),
    name: z.string(),
    lastName: z.string(), 
    email: z.string().email(),
})

export function validateUser(input){
    return userSchema.safeParse(input);
}