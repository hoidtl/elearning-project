import { useState } from 'react';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Tài khoản của tôi</h1>

        <div className="profile-layout">
          <aside className="profile-sidebar">
            <div className="profile-avatar">
              <img src={user?.avatar || '/default-avatar.png'} alt={user?.name} />
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
            </div>

            <nav className="profile-nav">
              <button
                className={activeTab === 'info' ? 'active' : ''}
                onClick={() => setActiveTab('info')}
              >
                Thông tin cá nhân
              </button>
              <button
                className={activeTab === 'password' ? 'active' : ''}
                onClick={() => setActiveTab('password')}
              >
                Đổi mật khẩu
              </button>
              <button
                className={activeTab === 'addresses' ? 'active' : ''}
                onClick={() => setActiveTab('addresses')}
              >
                Địa chỉ
              </button>
            </nav>
          </aside>

          <div className="profile-content">
            {activeTab === 'info' && (
              <div className="profile-section">
                <h2>Thông tin cá nhân</h2>
                <form>
                  <div className="form-group">
                    <label>Họ và tên</label>
                    <input type="text" defaultValue={user?.name} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={user?.email} disabled />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="tel" defaultValue={user?.phone} />
                  </div>
                  <button type="submit" className="btn-primary">
                    Cập nhật
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="profile-section">
                <h2>Đổi mật khẩu</h2>
                <form>
                  <div className="form-group">
                    <label>Mật khẩu hiện tại</label>
                    <input type="password" />
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu mới</label>
                    <input type="password" />
                  </div>
                  <div className="form-group">
                    <label>Xác nhận mật khẩu mới</label>
                    <input type="password" />
                  </div>
                  <button type="submit" className="btn-primary">
                    Đổi mật khẩu
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="profile-section">
                <h2>Địa chỉ của tôi</h2>
                <button className="btn-primary">Thêm địa chỉ mới</button>
                <div className="addresses-list">
                  <p>Chưa có địa chỉ nào</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
