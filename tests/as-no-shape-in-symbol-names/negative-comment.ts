// Row shapes are documented in the schema module.
declare const schema: Record<string, { id: string }>;

export const idSchema = schema.shape.id;
