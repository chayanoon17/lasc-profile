// app/api/checkbox/route.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ใช้ named export สำหรับ POST method
export async function POST(req: Request) {
  const { checkboxes } = await req.json()

  // ตรวจสอบข้อมูลที่ได้รับ
  console.log('Received checkboxes:', checkboxes)

  if (!checkboxes || checkboxes.length === 0) {
    return new Response(JSON.stringify({ message: 'No checkboxes data provided' }), { status: 400 })
  }

  try {
    // ลบข้อมูล checkbox เก่าในฐานข้อมูล (ถ้าต้องการ)
    await prisma.checkbox.deleteMany({})

    // บันทึกข้อมูล checkbox ใหม่
    const savedCheckboxes = await prisma.checkbox.createMany({
      data: checkboxes.map((checkbox: { label: string; selected: boolean }) => ({
        label: checkbox.label,
        selected: checkbox.selected,
      })),
    })

    console.log('Saved checkboxes:', savedCheckboxes)

    return new Response(JSON.stringify(savedCheckboxes), { status: 200 })
  } catch (error) {
    console.error('Error saving data:', error)
    return new Response(JSON.stringify({ message: 'Error saving checkboxes', error: (error as Error).message }), { status: 500 })
  }
}

export async function GET() {
    try {
        const checkboxes = await prisma.checkbox.findMany()
        return new Response(JSON.stringify(checkboxes), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error fetching checkboxes', error: (error as Error).message}))
    }
    
}