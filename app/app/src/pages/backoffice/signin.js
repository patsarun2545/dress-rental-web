import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import config from "../../config";
import { useNavigate } from "react-router-dom";

function SingIn() {
  const [user, setUser] = useState({ user: "", pass: "" });
  const Navigate = useNavigate();

  const handleChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field === "email" ? "user" : "pass"]: value,
    }));
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(config.apiPath + "/user/signin", user);

      if (res.data.token !== undefined) {
        localStorage.setItem("token", res.data.token);
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: "ยินดีต้อนรับ",
          timer: 1000, // Auto-close after 2 seconds
          showConfirmButton: false, // Hide the OK button
          willClose: () => {
            Navigate("/dashboard"); // Navigate after Swal closes
          },
        });
      }
    } catch (e) {
      if (e.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "การลงชื่อเข้าใช้ล้มเหลว",
          text: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
          timer: 1000, // Auto-close after 2 seconds
          showConfirmButton: false, // Hide the OK button
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "เกิดข้อผิดพลาดลองใหม่อีกครั้ง",
          icon: "error",
        });
      }
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "linear-gradient(135deg, #fff5e6, #ffd5d5)" }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-[#c59b6d] mb-4">
          เข้าสู่ระบบหลังบ้าน
        </h2>

        <div className="mb-4 relative">
          <input
            type="email"
            className="w-full px-12 py-2 bg-[#f9f7ff] border-2 border-[#c59b6d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c59b6d] focus:border-transparent"
            placeholder="ชื่อ"
            value={user.user}
            onChange={(e) => setUser({ ...user, user: e.target.value })}
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#c59b6d]">
            <i className="fas fa-user"></i>
          </span>
        </div>

        <div className="mb-4 relative">
          <input
            type="password"
            className="w-full px-12 py-2 bg-[#f9f7ff] border-2 border-[#c59b6d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c59b6d] focus:border-transparent"
            placeholder="รหัสผ่าน"
            value={user.pass}
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#c59b6d]">
            <i className="fas fa-lock"></i>
          </span>
        </div>

        <button
          className="w-full bg-[#c59b6d] text-white py-2 rounded-md hover:bg-[#b88a5a] transition"
          onClick={handleSignIn}
        >
          เข้าสู่ระบบ
        </button>

        {/* Demo Account Box */}
        <div
          className="mt-4 p-3 rounded-xl"
          style={{ backgroundColor: "#f8f9fa", border: "1px dashed #dee2e6" }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-gray-400 mb-0 text-xs font-semibold tracking-wide">
              🔑 บัญชีทดลองใช้
            </p>
            <span className="text-xs bg-gray-800 text-white rounded-md px-2 py-0.5">
              ADMIN
            </span>
          </div>

          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-400">อีเมล</span>
              <span
                className="font-semibold text-gray-800 cursor-pointer"
                style={{ userSelect: "all" }}
                onClick={() => handleChange("email", "admin@gmail.com")}
              >
                admin@gmail.com
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">รหัสผ่าน</span>
              <span
                className="font-semibold text-gray-800 cursor-pointer"
                style={{ userSelect: "all" }}
                onClick={() => handleChange("password", "Admin11111111")}
              >
                Admin11111111
              </span>
            </div>
          </div>

          <button
            className="w-full mt-2 py-1.5 text-xs border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={() => {
              handleChange("email", "admin@gmail.com");
              handleChange("password", "Admin11111111");
            }}
          >
            กรอกข้อมูลอัตโนมัติ
          </button>
        </div>
      </div>
    </div>
  );
}
export default SingIn;
