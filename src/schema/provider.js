import z from 'zod';

const materialSchema = z.object({
    name: z.string(),
    brand: z.string(),
    category: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
});

const providerSchema = z.object({
    providerName: z.string(),
    reputation: z.number().int().min(0).max(5),
    deliveryTime: z.string(),
    expirationDate: z.date(),
    totalPrice: z.number().positive(),
    materials: z.array(materialSchema).nonempty()
});

export function validateProvider(input) {
    return providerSchema.safeParse(input);
}
