const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <section className="about-hero">
          <h1>Về E-Learning Platform</h1>
          <p>Nền tảng học trực tuyến hàng đầu Việt Nam</p>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h2>Sứ mệnh của chúng tôi</h2>
            <p>
              Chúng tôi tin rằng giáo dục là chìa khóa để mở ra cơ hội cho mọi người.
              Sứ mệnh của chúng tôi là làm cho giáo dục chất lượng cao trở nên dễ tiếp cận
              và giá cả phải chăng cho tất cả mọi người, ở mọi nơi.
            </p>
          </div>

          <div className="about-section">
            <h2>Tầm nhìn</h2>
            <p>
              Trở thành nền tảng học trực tuyến hàng đầu tại Việt Nam, cung cấp
              hàng nghìn khóa học chất lượng cao từ các chuyên gia hàng đầu trong
              nhiều lĩnh vực khác nhau.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>10,000+</h3>
              <p>Học viên</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Khóa học</p>
            </div>
            <div className="stat-card">
              <h3>100+</h3>
              <p>Giảng viên</p>
            </div>
            <div className="stat-card">
              <h3>4.8/5</h3>
              <p>Đánh giá</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
