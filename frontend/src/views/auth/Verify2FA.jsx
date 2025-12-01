import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../partials/Header';
import { verify2FA } from '../../utils/auth';
import './login.css';

export default function Verify2FA() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state?.user_id || sessionStorage.getItem('temp_user_id');
  const pre_token = sessionStorage.getItem('pre_token');

  useEffect(() => {
    if (!user_id) {
      navigate('/login');
    }
  }, [user_id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isRecovery && code.length !== 6) {
      setError('Mã 2FA phải có 6 chữ số.');
      setLoading(false);
      return;
    }

    if (isRecovery && code.length !== 10) {
      setError('Mã khôi phục phải có 10 ký tự.');
      setLoading(false);
      return;
    }

    try {
      const response = await verify2FA(user_id, code, pre_token);
      if (response.status === 200) {
        sessionStorage.removeItem('temp_user_id');
        sessionStorage.removeItem('pre_token');
        navigate('/profile');
      } else {
        setError(response.detail || 'Mã xác thực không đúng. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi xác thực.');
    } finally {
      setLoading(false);
    }
  };

  const toggleRecovery = () => {
    setIsRecovery(!isRecovery);
    setCode('');
    setError('');
  }

  return (
    <>
      <section className="login-container">
        <Header />
        <div className="login-form-container">
          <div className="login-form">
            <div className="login-form-icon">
              <img src='/icons/hoa.png' width='50px' height='50px' alt='logo' />
            </div>
            <h3>{isRecovery ? 'Mã khôi phục' : 'Xác thực 2FA'}</h3>
            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
              {isRecovery
                ? 'Nhập một trong các mã khôi phục của bạn'
                : 'Nhập mã 6 chữ số từ ứng dụng xác thực của bạn'}
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <div className="login-input_box">
                <label htmlFor="code">{isRecovery ? 'Mã khôi phục' : 'Mã xác thực'}</label>
                <input
                  type="text"
                  id="code"
                  placeholder={isRecovery ? "XXXXXXXXXX" : "XXXXXX"}
                  value={code}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                    setCode(isRecovery ? val.slice(0, 10) : val.replace(/\D/g, '').slice(0, 6));
                  }}
                  required
                  maxLength={isRecovery ? 10 : 6}
                  className="input-code"
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Đang xác thực...' : 'Xác thực'}
              </button>
            </form>

            <div style={{ marginTop: '15px', textAlign: 'center', width: '100%' }}>
              <button
                onClick={toggleRecovery}
                className="btn-link"
                style={{ display: 'block', width: '100%', marginBottom: '10px' }}
              >
                {isRecovery ? 'Sử dụng mã xác thực (TOTP)' : 'Sử dụng mã khôi phục'}
              </button>

              <button
                onClick={() => {
                  sessionStorage.removeItem('temp_user_id');
                  sessionStorage.removeItem('temp_user_id');
                  sessionStorage.removeItem('pre_token');
                  navigate('/login');
                }}
                className="btn-link"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}