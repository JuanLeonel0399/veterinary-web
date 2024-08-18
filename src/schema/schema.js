import zod from 'zod'

const userSchema = zod.object({
  username: zod.string()
    .min(5, { message: 'El nombre de usuario debe tener al menos 5 caracteres.' })
    .max(20, { message: 'El nombre de usuario no puede tener más de 20 caracteres.' }),
  email: zod.string()
    .email({ message: 'Debe ser un correo electrónico válido.' }),
  password: zod.string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    .max(100, { message: 'La contraseña no puede tener más de 100 caracteres.' })
    .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula.' })
    .regex(/[a-z]/, { message: 'La contraseña debe contener al menos un número.' })
    .regex(/[\W_]/, { message: 'La contraseña debe contener al menos un símbolo.' })
});

export function validateUser(user){
  return userSchema.safeParse(user)
}

export function validateProfilePicture(file) {
  if (!file) {
    return { success: false, error: 'Se requiere una foto de perfil.' };
  }

  const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedExtensions.includes(file.type)) {
    return { success: false, error: 'El archivo debe ser una imagen (JPEG, PNG, GIF).' };
  }

  const maxSizeInMB = 5; // Tamaño máximo permitido de 5MB
  if (file.size > maxSizeInMB * 1024 * 1024) {
    return { success: false, error: `La imagen no puede exceder los ${maxSizeInMB} MB.` };
  }

  return { success: true };
}