"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function InvoiceForm() {
  const [items, setItems] = useState<
    { description: string; quantity: number; price: number }[]
  >([]);
  const [total, setTotal] = useState<number>(0);

  // ฟังก์ชันสำหรับการเพิ่มรายการ
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  // ฟังก์ชันสำหรับการลบรายการ
  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // ฟังก์ชันสำหรับการอัปเดตข้อมูลรายการ
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  // ฟังก์ชันคำนวณผลรวม
  const calculateTotal = () => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.quantity * item.price;
    });
    setTotal(sum);
  };

  // ฟังก์ชันสำหรับการส่งข้อมูล
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTotal(); // คำนวณผลรวมเมื่อส่งฟอร์ม
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-md shadow-md w-full ">
      <h2 className="font-semibold text-center mb-6">ใบเสร็จการชำระเงิน</h2>

      {/* ตารางรายการ */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ลำดับ</th>
              <th className="px-4 py-2 border">รายการ</th>
              <th className="px-4 py-2 border">จำนวน</th>
              <th className="px-4 py-2 border">ราคา</th>
              <th className="px-4 py-2 border">รวม</th>
              <th className="px-4 py-2 border">...</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "quantity",
                        e.target.value.toString()
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    min="1"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "price",
                        e.target.value.toString()
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    min="0"
                  />
                </td>
                <td className="px-4 py-2 border text-center">
                  {item.quantity * item.price}
                </td>
                <td className="px-4 py-2 border text-center">
                  <Button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    ลบ
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ปุ่มเพิ่มรายการ */}
      <div className="text-center mt-4">
        <Button type="button" onClick={addItem}>
          เพิ่มรายการ
        </Button>
      </div>

      {/* ผลรวม */}
      <div className="mt-6 text-right">
        <h3 className="font-semibold">ผลรวม: {total} บาท</h3>
      </div>

      {/* ปุ่มบันทึก */}
      <div className="text-center mt-6">
        <Button type="submit">บันทึกข้อมูล</Button>
      </div>

      <div className="mt-4">
        <p>13. การใช้ทรัพยากรร่วมกัน (ถ้ามี) -</p>
        <p>
          14. ผลที่คาดว่าจะได้รับ 1) ได้รับผลการประเมินคุณภาพการศึกษา
          โดยผู้ทรงคุณวุฒิจากภายนอก รวมทั้งได้รับข้อเสนอแนะ แนวทางในการปรับปรุง
          พัฒนาคุณภาพการศึกษา เพื่อพัฒนากลยุทธ์การดำเนินงานต่อ 2)
          อาจารย์ประจำหลักสูตรมีความรู้ความเข้าเกณฑ์การประกันคุณภาพการศึกษา
        </p>
        <p>
          15. วิธีการประเมินผลและเครื่องมือที่ใช้ 1)
          แบบรายงานการประเมินคุณภาพการศึกษาภายใน ระดับหลักสูตร 2)
          แผนพัฒนาคุณภาพการศึกษาภายในระดับหลักสูตร ประจำปีการศึกษา 2562
        </p>
        <p>
          16. สาเหตุหรือปัจจัยความเสี่ยงที่อาจจะเกิดขึ้นในการดำเนินโครงการ
          สาเหตุหรือปัจจัยความเสี่ยง แนวทางแก้ไข/ป้องกันความเสี่ยง 1)
          การดำเนินโครงการอาจเกินระยะเวลาที่กำหนด 1)
          ส่งเอกสารให้คณะกรรมการล่วงหน้า 7 วัน
        </p>
      </div>
    </form>
  );
}
