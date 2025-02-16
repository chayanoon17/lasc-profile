'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';

import { useSession } from 'next-auth/react'; // หากใช้ next-auth สำหรับการจัดการ session
import { Textarea } from './ui/textarea';

export default function CheckboxForm() {
  const { data: session } = useSession(); // ใช้ session เพื่อตรวจสอบ role
  const [checkboxes, setCheckboxes] = useState<{ id: number; label: string; selected: boolean }[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // กำหนดว่า user หรือ admin จาก session
  const isAdmin = session?.user?.role === 'admin'; // ตรวจสอบ role จาก session

  // ฟังก์ชันสำหรับการเพิ่ม checkbox (สำหรับ Admin เท่านั้น)
  const addCheckbox = () => {
    if (isAdmin) {
      const newId = checkboxes.length ? checkboxes[checkboxes.length - 1].id + 1 : 1;
      const newCheckbox = { id: newId, label: `ยุทธศาสตร์ ${newId}`, selected: false };
      setCheckboxes((prevCheckboxes) => [...prevCheckboxes, newCheckbox]);
    }
  };

  // ฟังก์ชันสำหรับการลบ checkbox (เฉพาะ Admin)
  const removeCheckbox = (id: number) => {
    if (isAdmin) {
      setCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter((checkbox) => checkbox.id !== id)
      );
    }
  };

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงสถานะของ checkbox (ทั้ง User และ Admin)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === parseInt(id) ? { ...checkbox, selected: checked } : checkbox
    );
    setCheckboxes(updatedCheckboxes); // อัปเดตค่าของ checkboxes
  };

  // ฟังก์ชันสำหรับการเปลี่ยนแปลง label ของ checkbox (เฉพาะ Admin)
  const handleLabelChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: number) => {
    if (isAdmin) {
      const updatedCheckboxes = checkboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, label: e.target.value } : checkbox
      );
      setCheckboxes(updatedCheckboxes);
    }
  };

  // ฟังก์ชันสำหรับการดึงข้อมูล checkbox จาก API
  const fetchCheckboxes = async () => {
    try {
      const response = await fetch('/api/checkbox');
      if (response.ok) {
        const data = await response.json();
        setCheckboxes(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ดึงข้อมูลตอน component mount
  useEffect(() => {
    fetchCheckboxes();
  }, []);

  // ฟังก์ชันสำหรับการบันทึกข้อมูลลงฐานข้อมูล
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/checkbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkboxes }),
      });
      if (response.ok) {
        setIsSaved(true);
        console.log('Data saved successfully!');
      } else {
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSave} className="p-8 rounded-md shadow-md w-full max-w-4xl">
      <h2 className="font-semibold text-center mb-6">
        ความสอดคล้องกับยุทธศาสตร์และแผนพัฒนาหน่วยงาน
      </h2>

      {/* แสดงปุ่ม "เพิ่มยุทธศาสตร์" เฉพาะ Admin */}
      {isAdmin && (
        <Button type="button" onClick={addCheckbox}>
          เพิ่มยุทธศาสตร์
        </Button>
      )}

      {/* แสดง checkbox ที่ดึงจากฐานข้อมูล */}
      {checkboxes.map((checkbox) => (
        <div key={checkbox.id} className="mb-4 mt-4">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              id={String(checkbox.id)}  // ใช้ ID ของ checkbox
              onChange={handleChange} // ใช้ฟังก์ชัน handleChange สำหรับการเปลี่ยนแปลง
              className="mr-2"
            />
            {/* ให้ผู้ใช้กรอกข้อมูลใน label ได้ */}
            <Textarea
              value={checkbox.label}
              onChange={(e) => handleLabelChange(e, checkbox.id)}
              className="text-sm p-1 border border-gray-300 rounded-md ml-2 text-white"
              disabled={!isAdmin}  // ให้เฉพาะ Admin แก้ไข label ได้
              rows={3}
            />
            {/* ปุ่มลบเฉพาะ Admin */}
            {isAdmin && (
              <button
                type="button"
                onClick={() => removeCheckbox(checkbox.id)}
                className="ml-2 text-red-500"
              >
                ลบ
              </button>
            )}
          </label>
        </div>
      ))}

      <div className="text-center mt-6">
        {/* แสดงปุ่มบันทึกเฉพาะ Admin */}
        {isAdmin && (
          <Button type="submit">
            {isSaved ? 'บันทึกแล้ว' : 'บันทึกข้อมูล'}
          </Button>
        )}
      </div>
    </form>
  );
}
