const API_URL = process.env.NEXT_PUBLIC_JARVI_API_URL
const API_KEY = process.env.NEXT_PUBLIC_JARVI_API_KEY

if (!API_URL || !API_KEY) {
  throw new Error('API URL or API KEY not set in env variables.')
}


// Type of upload files
export interface JarviFile {
  fileName: string
  data: string
}

export interface ApplicationPayload {
  referenceId?: string
  projectId?: string
  firstName?: string
  lastName?: string
  emailAddresses?: string
  phoneNumbers?: string
  linkedinUrl?: string
  historyEntrySubject?: string
  historyEntryMessage?: string
  resumesFiles?: JarviFile[]
  files?: JarviFile[]
  externalId?: string
  id?: string
  location?: string
  headline?: string
  currentCompanyName?: string
  currentCompanyId?: string
  currentPosition?: string

  [customFieldUuid: string]: string | string[] | JarviFile[] | undefined
}


/**
 * Envoie la candidature à l'API Jarvi
 * @param data Données à envoyer
 * @throws Erreur si la requête échoue
 * @returns La réponse JSON en cas de succès
 */

export async function postApplication(data: ApplicationPayload) {

  if (!API_URL || !API_KEY) throw new Error('API URL or API KEY not set in env variables.')

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    let errorMessage = `Erreur API: ${response.status}`
    try {
      const errorData = await response.json()
      if (errorData?.message) errorMessage = errorData.message
    } catch {}
    throw new Error(errorMessage)
  }

  return response.json()
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Erreur lors de la conversion en base64'))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}
