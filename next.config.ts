import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  providers: [
    // Providers ที่ใช้งาน
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,  // เปิด debug เพื่อดูข้อมูลเพิ่มเติม
};

export default nextConfig;
