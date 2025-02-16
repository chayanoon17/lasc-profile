'use client';

import { useState } from 'react';
import { Button } from './ui/button';

export default function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);  // เก็บไฟล์ที่ผู้ใช้เลือก
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // ฟังก์ชันสำหรับการเลือกไฟล์
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];  // เลือกไฟล์แรก
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // ฟังก์ชันสำหรับการอัปโหลดไฟล์ไปยังเซิร์ฟเวอร์
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);  // เพิ่มไฟล์เข้าไปใน FormData

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSaved(true);
        console.log('File uploaded successfully!');
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-md shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold text-center mb-6">อัปโหลดไฟล์</h2>

      {/* ฟอร์มสำหรับการเลือกไฟล์ */}
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>

      <div className="text-center mt-6">
        <Button type="submit">
          {isSaved ? 'ไฟล์อัปโหลดแล้ว' : 'อัปโหลดไฟล์'}
        </Button>
      </div>
    </form>
  );
}
