'use client';

import { useState } from 'react';

export default function IntegrationForm() {
  const [formData, setFormData] = useState({
    teaching: false,
    teachingDetails: '',
    research: false,
    researchDetails: '',
    work: false,
    workDetails: '',
    culture: false,
    cultureDetails: '',
    service: false,
    serviceDetails: '', // Add the 'serviceDetails' property
    other: '',
  });

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // ฟังก์ชันสำหรับการบันทึกข้อมูล
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ทำการส่งข้อมูลที่กรอกไปที่ server หรือทำอย่างอื่นที่ต้องการ
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-md shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold text-center mb-6">การบูรณาการโครงการ</h2>

      {/* การจัดการเรียนการสอน */}
      <div className="mb-4">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            name="teaching"
            checked={formData.teaching}
            onChange={handleChange}
            className="mr-2"
          />
          การจัดการเรียนการสอน
        </label>

        {formData.teaching && (
          <div className="ml-6">
            <input
              type="text"
              name="teachingDetails"
              placeholder="รายวิชา...ทุกรายวิชา"
              value={formData.teachingDetails || ''}
              onChange={handleChange}
              className="text-sm p-1 border border-gray-300 rounded-md w-full mt-2"
            />
          </div>
        )}
      </div>

      {/* การวิจัย */}
      <div className="mb-4">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            name="research"
            checked={formData.research}
            onChange={handleChange}
            className="mr-2"
          />
          การวิจัย
        </label>

        {formData.research && (
          <div className="ml-6">
            <input
              type="text"
              name="researchDetails"
              placeholder="ระบุโครงการวิจัย"
              value={formData.researchDetails || ''}
              onChange={handleChange}
              className="text-sm p-1 border border-gray-300 rounded-md w-full mt-2"
            />
          </div>
        )}
      </div>

      {/* การปฏิบัติงาน */}
      <div className="mb-4">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            name="work"
            checked={formData.work}
            onChange={handleChange}
            className="mr-2"
          />
          การปฏิบัติงาน
        </label>

        {formData.work && (
          <div className="ml-6">
            <input
              type="text"
              name="workDetails"
              placeholder="ระบุรายละเอียดการปฏิบัติงาน"
              value={formData.workDetails || ''}
              onChange={handleChange}
              className="text-sm p-1 border border-gray-300 rounded-md w-full mt-2"
            />
          </div>
        )}
      </div>

      {/* ทำนุบำรุงศิลปวัฒนธรรม */}
      <div className="mb-4">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            name="culture"
            checked={formData.culture}
            onChange={handleChange}
            className="mr-2"
          />
          ทำนุบำรุงศิลปวัฒนธรรม
        </label>

        {formData.culture && (
          <div className="ml-6">
            <input
              type="text"
              name="cultureDetails"
              placeholder="ระบุรายละเอียดการทำนุบำรุงศิลปวัฒนธรรม"
              value={formData.cultureDetails || ''}
              onChange={handleChange}
              className="text-sm p-1 border border-gray-300 rounded-md w-full mt-2"
            />
          </div>
        )}
      </div>

      {/* บริการวิชาการ */}
      <div className="mb-4">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            name="service"
            checked={formData.service}
            onChange={handleChange}
            className="mr-2"
          />
          บริการวิชาการ
        </label>

        {formData.service && (
          <div className="ml-6">
            <input
              type="text"
              name="serviceDetails"
              placeholder="ระบุรายละเอียดบริการวิชาการ"
              value={formData.serviceDetails || ''}
              onChange={handleChange}
              className="text-sm p-1 border border-gray-300 rounded-md w-full mt-2"
            />
          </div>
        )}
      </div>

      {/* อื่น ๆ */}
      <div className="mb-4">
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            name="other"
            checked={formData.other !== ''}
            onChange={(e) => handleChange(e)}
            className="mr-2"
          />
          อื่น ๆ (ระบุ)
        </label>

        {formData.other !== '' && (
          <div className="ml-6">
            <input
              type="text"
              name="other"
              value={formData.other || ''}
              onChange={handleChange}
              className="text-sm p-1 border border-gray-300 rounded-md w-full mt-2"
              placeholder="ระบุรายละเอียด"

            />
          </div>
        )}
        
      </div>
    </form>
  );
}
