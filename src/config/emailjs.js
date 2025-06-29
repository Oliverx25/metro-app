// Configuración de EmailJS
// Reemplaza estos valores con tus claves reales de EmailJS
export const emailJSConfig = {
  // Tu User ID de EmailJS (disponible en Account -> General)
  userID: 'PgVjNweYmcDOAvYoD', // User ID de tu cuenta EmailJS

  // Tu Service ID de EmailJS (el servicio de correo que configuraste)
  serviceID: 'service_91nr25p',

  // Tu Template ID de EmailJS (la plantilla que creaste)
  templateID: 'template_ht5aruj', // ⚠️ IMPORTANTE: Reemplaza con el Template ID real después de guardar el template

  // Correo electrónico de destino fijo
  targetEmail: 'altruist.project.pds@gmail.com' // Reemplaza con el correo donde quieres recibir los tips
};

// Correo por defecto cuando el usuario no proporciona uno
export const defaultSenderEmail = 'usuario.anonimo@metrocdmx.com';
