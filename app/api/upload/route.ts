import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const validDocTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file size (must be at least some content but not exceed 5MB)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size must not exceed 5MB' },
        { status: 400 }
      )
    }

    // Validate file type - allow both images and documents
    const isImage = validImageTypes.includes(file.type)
    const isDocument = validDocTypes.includes(file.type)
    
    if (!isImage && !isDocument) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, PDF, DOC, DOCX.' },
        { status: 400 }
      )
    }

    // Generate unique filename with appropriate folder
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const folder = isImage ? 'courses' : 'resumes'
    const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`

    const blob = await put(filename, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
