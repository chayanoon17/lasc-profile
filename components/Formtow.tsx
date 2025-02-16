'use client';

import { useState } from 'react';
import { Input } from './ui/input';

export default function Formtow() {
  const [formData, setFormData] = useState({
    objective1: false,
    objective2: false,
    indicator1: false,
    indicator2: false,
    indicator3: false,
    indicator4: false,
    targetGroup1: '',
    targetGroup2: '',
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
    console.log('Form Data:', formData);
    // คุณสามารถส่งข้อมูลไปยัง API หรือทำงานอื่น ๆ ที่ต้องการที่นี่
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-md shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold text-center mb-6">
        วัตถุประสงค์และตัวชี้วัดความสำเร็จ
      </h2>

      {/* วัตถุประสงค์ของโครงการ */}
      <div className="mb-4">
        <h3 className="font-semibold">9.1 วัตถุประสงค์ของโครงการ</h3>
        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            name="objective1"
            checked={formData.objective1}
            onChange={handleChange}
            className="mr-2"
          />
          เพื่อประเมินระบบและกลไกการประกันคุณภาพการศึกษาระดับหลักสูตร
        </label>

        <label className="flex items-center text-sm text-white">
          <input
            type="checkbox"
            name="objective2"
            checked={formData.objective2}
            onChange={handleChange}
            className="mr-2"
          />
          เพื่อประเมินผลการดำเนินงานของหลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์
          สาขาวิชาเทคโนโลยีสารสนเทศ สาขาวิชาวิศวกรรมซอฟต์แวร์ คณะศิลปศาสตร์และวิทยาศาสตร์ มหาวิทยาลัยราชภัฏศรีสะเกษ
        </label>
      </div>

      {/* ตัวชี้วัดความสำเร็จของโครงการ */}
      <div className="mb-4">
        <h3 className="font-semibold">9.2 ตัวชี้วัดความสำเร็จของโครงการ</h3>

        <div className="ml-6">
          <h4 className="font-semibold">9.2.1 เชิงปริมาณ</h4>
          <label className="flex items-center text-sm text-white">
            <input
              type="checkbox"
              name="indicator1"
              checked={formData.indicator1}
              onChange={handleChange}
              className="mr-2"
            />
            ผลการประเมินคุณภาพการศึกษาภายในระดับหลักสูตร อยู่ในระดับ ดี (คะแนน 3.01 ขึ้นไป)
          </label>

          <label className="flex items-center text-sm text-white">
            <input
              type="checkbox"
              name="indicator2"
              checked={formData.indicator2}
              onChange={handleChange}
              className="mr-2"
            />
            จำนวนอาจารย์ประจำหลักสูตรเข้าร่วมร้อยละ 80
          </label>
        </div>

        <div className="ml-6">
          <h4 className="font-semibold">9.2.2 เชิงคุณภาพ</h4>
          <label className="flex items-center text-sm text-white">
            <input
              type="checkbox"
              name="indicator3"
              checked={formData.indicator3}
              onChange={handleChange}
              className="mr-2"
            />
            อาจารย์ประจำหลักสูตร มีความรู้ความเข้าใจเกณฑ์การประกันคุณภาพการศึกษา
          </label>

          <label className="flex items-center text-sm text-white">
            <input
              type="checkbox"
              name="indicator4"
              checked={formData.indicator4}
              onChange={handleChange}
              className="mr-2"
            />
            สาขาวิชาวิศวกรรมซอฟต์แวร์ โดยผู้ทรงคุณวุฒิจากภายนอก รวมทั้งได้รับข้อเสนอแนะและ
            แนวทางในการปรับปรุง พัฒนาคุณภาพการศึกษา เพื่อพัฒนากลยุทธ์การดำเนินงานต่อ
          </label>
        </div>
      </div>

      {/* กลุ่มเป้าหมาย/ผู้เข้าร่วมโครงการ */}
      <div className="mb-4">
        <h3 className="font-semibold">10. กลุ่มเป้าหมาย/ผู้เข้าร่วมโครงการ</h3>
        
        <label className="flex items-center text-sm text-white ">
          ประธานและกรรมการประเมินคุณภาพการศึกษาฯ จำนวน
          
        </label>
        <Input
            type="number"
            name="targetGroup1"
            value={formData.targetGroup1}
            onChange={handleChange}
            className="ml-2 p-1 border border-gray-300 rounded-md "
            min="0"
          />
          ท่าน

        <label className="flex items-center text-sm text-white mt-2">
          อาจารย์ประจำหลักสูตร จำนวน
          
        </label>
        <Input
            type="number"
            name="targetGroup2"
            value={formData.targetGroup2}
            onChange={handleChange}
            className="ml-2 p-1 border border-gray-300 rounded-md "
            min="0"
          />
          ท่าน
      </div>

    </form>
  );
}
