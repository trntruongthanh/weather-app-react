          // dt là giá trị timestamp Unix (thời gian được biểu diễn bằng số giây tính từ ngày 1/1/1970 UTC). Ví dụ: 1732168800
          // Trong JavaScript, timestamp được tính bằng mili-giây, vì vậy cần nhân giá trị dt với 1000 để chuyển đổi từ giây sang mili-giây:

          const date = new Date(dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",  // Hiển thị tên đầy đủ của ngày trong tuần (e.g., "Thursday")
            month: "short",   // Hiển thị tên viết tắt của tháng (e.g., "Nov")
            day: "numeric",   // Hiển thị số ngày (e.g., "21")
          });
