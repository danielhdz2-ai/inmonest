import { storageUploadHeaders } from '@/lib/gestoria-upload'

export type UploadProgressState = {
  percent: number
  loaded: number
  total: number
}

/** PUT a Supabase Storage con progreso (fetch no expone upload progress) */
export function uploadFileWithProgress(
  signedUrl: string,
  file: File,
  contentType: string,
  onProgress?: (state: UploadProgressState) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', signedUrl)
    const headers = storageUploadHeaders(contentType)
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value as string)
    })

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || !onProgress) return
      const percent = Math.min(100, Math.round((event.loaded / event.total) * 100))
      onProgress({ percent, loaded: event.loaded, total: event.total })
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.({ percent: 100, loaded: file.size, total: file.size })
        resolve()
        return
      }
      reject(new Error(`Error al subir (${xhr.status})`))
    }

    xhr.onerror = () => reject(new Error('Error de red al subir el archivo'))
    xhr.onabort = () => reject(new Error('Subida cancelada'))
    xhr.send(file)
  })
}
