'use client'

import { useState } from 'react'
import { Input } from './ui/input'

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    organization: '',
    projectName: '',
    responsiblePersons: '',
    projectDuration: '',
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission, like sending data to an API
    console.log('Form Submitted:', formData)
  }

  return (
        
      <form onSubmit={handleSubmit} className=" p-8 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-wh mb-6">ข้อมูลโครงการ</h2>

        {/* หน่วยงาน */}
        <div className="mb-4">
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">หน่วยงาน</label>
          <Input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            placeholder="หน่วยงาน "
          />
        </div>

        {/* ชื่อโครงการ */}
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">ชื่อโครงการ</label>
          <Input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            placeholder="ชื่อโครงการ"
          />
        </div>

        {/* ผู้รับผิดชอบโครงการ */}
        <div className="mb-4">
          <label htmlFor="responsiblePersons" className="block text-sm font-medium text-gray-700">ผู้รับผิดชอบโครงการ</label>
          <Input
            type="text"
            id="responsiblePersons"
            name="responsiblePersons"
            value={formData.responsiblePersons}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            placeholder="ผู้รับผิดชอบโครงการ"
          />
        </div>

        {/* ระยะเวลาในการดำเนินงาน */}
        <div className="mb-4">
          <label htmlFor="projectDuration" className="block text-sm font-medium text-gray-700">ระยะเวลาในการดำเนินงาน</label>
          <Input
            type="text"
            id="projectDuration"
            name="projectDuration"
            value={formData.projectDuration}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            placeholder="21 มิถุนายน 2566"
          />
        </div>

        {/* สถานที่จัดโครงการ */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">สถานที่จัดโครงการ</label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            placeholder="ห้อง 4210 อาคารจุฬาภรณ์วลัยลักษ์ มหาวิทยาลัยราชภัฏศรีสะเกษ"
          />
        </div>

      </form>
        
  )
}
