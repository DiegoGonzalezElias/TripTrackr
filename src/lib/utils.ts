import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from 'jwt-decode';
import { authService } from "@/modules/auth/application/auth.service";
import { createAuthRepository } from "@/modules/auth/infrastructure/auth.repository";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000); // En segundos
    if (!decoded.exp) return true; // Si no tiene expiración, asume que está caducado
    return decoded.exp < currentTimestamp; // Retorna true si está caducado
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Si no se puede decodificar, asume que está caducado
  }
}

export async function validateAccessToken(accessToken: string, setAccessToken: (token: string) => void): Promise<string | null> {
  let validatedToken = null
  if (isTokenExpired(accessToken)) {
    const authServiceImpl = authService(createAuthRepository());
    const newToken = await authServiceImpl.getToken();
    if (newToken.accessToken) {
      validatedToken = newToken.accessToken;
      setAccessToken(newToken.accessToken);
    }
  }

  return validatedToken;
}